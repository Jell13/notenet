import { error } from "console";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getNoteBook = query({
    handler: async (ctx) => {
        
        const identity = await ctx.auth.getUserIdentity()
        console.log(identity)
        if(!identity){
            throw new Error("Unauthorized")
        }

        const notes = await ctx.db.query("documents").withIndex("by_userId", q => q.eq("userId",identity.subject)).collect()
        
        return notes
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

