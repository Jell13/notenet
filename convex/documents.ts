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

export const createNotebook = mutation({
    args:{
        title: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new Error("Unauthorized")
        }

        const userId = identity.subject
        
        const newNotebook = await ctx.db.insert("documents",{
            title: args.title,
            userId: userId
        })
    }
})

export const getNoteInfo = query({
    args:{
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const info = await ctx.db.get(args.id)
        return info
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



