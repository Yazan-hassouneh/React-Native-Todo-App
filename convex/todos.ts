import { ConvexError, v } from "convex/values"
import { mutation, query } from './_generated/server'

export const getTodos = query({
    handler: async (ctx) => {
        const allTodos = await ctx.db.query("todos").order("desc").collect()
        return allTodos
    }
})

export const addTodo = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const todoId = await ctx.db.insert("todos", { text: args.text, isCompleted: false })
        return todoId
    }
})

export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id)
        if (!todo) throw new ConvexError("Todo Not exist")
        await ctx.db.patch(args.id, { isCompleted: !todo.isCompleted })
    }
})

export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id)
        if (!todo) throw new ConvexError("Todo Not exist")
        return await ctx.db.delete(args.id)
    }
})

export const deleteAlTodo = mutation({
    handler: async (ctx) => {
        const allTodos = await ctx.db.query("todos").collect()
        allTodos.forEach(async (todo) => {
            await ctx.db.delete(todo._id)
        });

        return { deletedCount: allTodos.length }
    }
})