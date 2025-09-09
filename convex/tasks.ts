import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("owner"), identity.email))
      .collect();
  },
});

export const addTask = mutation({
  args: {
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const task = {
      description: args.description,
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
    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");
    return await ctx.db.patch(args.id, { completed: !task.completed });
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");
    await ctx.db.delete(args.id);
    return task;
  },
});
