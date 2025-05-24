import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();

    if (user?.length === 0) {
      await ctx.db.insert('users', {
        name: args.name,
        email: args.email,
        picture: args.picture,
        uid: args.uid,
        token: 50000,
      });
    }
  },
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();
    return user[0] ?? null;
  },
});

export const CreateOrGetUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUsers = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();

    if (existingUsers.length > 0) {
      return existingUsers[0];
    }

    const id = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      picture: args.picture,
      uid: args.uid,
      token: 50000,
    });

    return {
      _id: id,
      ...args,
      token: 50000,
    };
  },
});
