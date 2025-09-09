import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    description: v.string(),
    completed: v.boolean(),
    owner: v.string(),
  }).index("by_owner", ["owner"]),
});
