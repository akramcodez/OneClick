import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { query } from './_generated/server';

export const CreateWorkspace = mutation({
  args: {
    message: v.any(),
    user: v.id('users'),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.insert('workspace', {
      message: args.message,
      user: args.user,
    });
    return workspace;
  },
});

export const GetWorkspace = query({
  args: {
    workspaceId: v.id('workspace'),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workspaceId);
    return result;
  },
});

export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id('workspace'),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      message: args.messages,
    });
    return result;
  },
});

export const UpdateFiles = mutation({
  args: {
    workspaceId: v.id('workspace'),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      fileData: args.files,
    });
    return result;
  },
});

export const GetAllWorkspaces = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const allWorkspaces = await ctx.db
      .query('workspace')
      .filter((q) => q.eq(q.field('user'), args.userId))
      .collect();
    return allWorkspaces;
  },
});
