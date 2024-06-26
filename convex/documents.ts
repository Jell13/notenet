import { error } from "console";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getNoteBook = query({
    handler: async (ctx) => {
        
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new Error("Unauthorized")
        }

        const notes = await ctx.db.query("documents").withIndex("by_userId", q => q.eq("userId",identity.subject)).collect()
        
        return notes
    }
})

export const getNoteLength = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new Error("Unauthorized")
        }

        const notes = await ctx.db.query("documents").withIndex("by_userId", q => q.eq("userId", identity.subject)).collect()

        return notes.length
    }
})

export const getNoteInfo = query({
    args:{
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const info = await ctx.db.get(args.id)
        if(!info){
            throw new Error("No document exist")
        }
        return info
    }
})

export const getNoteContent = query({
    args:{
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const note = await ctx.db.get(args.id)
        if(!note){
            throw new Error("Error in getting content")
        }
        return note.content
    }
})

export const createNotebook = mutation({
    args:{
        title: v.string(),
        content: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new Error("Unauthorized")
        }

        const userId = identity.subject
        
        const newNotebook = await ctx.db.insert("documents",{
            title: args.title,
            userId: userId,
            content: args.content
        })
    }
})

export const deleteNote = mutation({
    args:{
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new Error("Unauthorized")
        }

        await ctx.db.delete(args.id)
    }
})

export const updateContent = mutation({
    args: {
        id: v.id("documents"),
        content: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new Error("Unauthorized")
        }

        await ctx.db.patch(args.id, {
            content: args.content
        })
    }
})

