import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

// Helper function to validate authentication
const requireAuth = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.email) {
    throw new ConvexError("Authentication required");
  }
  return identity;
};

// Helper function to validate task ownership
const validateTaskOwnership = async (
  ctx: QueryCtx | MutationCtx,
  taskId: Id<"tasks">,
  userEmail: string,
) => {
  const task = await ctx.db.get(taskId);
  if (!task) {
    throw new ConvexError("Task not found");
  }
  if (task.owner !== userEmail) {
    throw new ConvexError("Unauthorized: You can only access your own tasks");
  }
  return task;
};

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    const identity = await requireAuth(ctx);

    return ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("owner"), identity.email))
      .order("desc") // Show newest tasks first
      .collect();
  },
});

export const addTask = mutation({
  args: {
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    // Validate input
    const description = args.description.trim();
    if (!description) {
      throw new ConvexError("Task description cannot be empty");
    }
    if (description.length > 100) {
      throw new ConvexError("Task description must be 100 characters or less");
    }
    if (description.length < 2) {
      throw new ConvexError("Task description must be at least 2 characters");
    }

    const task = {
      description,
      completed: false,
      owner: identity.email!,
    };

    const id = await ctx.db.insert("tasks", task);
    return await ctx.db.get(id);
  },
});

export const toggleTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);
    const task = await validateTaskOwnership(ctx, args.id, identity.email!);

    await ctx.db.patch(args.id, { completed: !task.completed });
    return await ctx.db.get(args.id);
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);
    const task = await validateTaskOwnership(ctx, args.id, identity.email!);

    await ctx.db.delete(args.id);
    return { success: true, deletedTask: task };
  },
});
