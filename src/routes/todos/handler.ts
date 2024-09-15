import { NotFoundError } from "elysia";
import prisma from "../../db";

export async function getTodos() {
	try {
		return await prisma.todo.findMany({ orderBy: { createdAt: "asc" } });
	} catch (error) {
		console.error("Error getting Todos");
	}
}

export async function createTodo(data: { title: string; description: string }) {
	try {
		const todo = await prisma.todo.create({ data: data });
		if (!todo) throw new NotFoundError("Error creating Todo");
		return todo;
	} catch (error) {
		console.error("Error creating Todo");
	}
}

export async function getTodoById(id: number) {
	try {
		return await prisma.todo.findUnique({ where: { id } });
	} catch (error) {
		console.error("Error getting Todo with id " + id);
	}
}

export async function updateTodo(id: number, data: { title?: string; description?: string; completed?: boolean }) {
	try {
		const { title, description, completed } = data;
		return await prisma.todo.update({
			where: { id },
			data: {
				...(title && { title }),
				...(description && { description }),
				...(completed !== undefined && completed !== null && { completed })
			}
		});
	} catch (error) {
		console.error("Error updating Todo with id " + id);
	}
}

export async function deleteTodo(id: number) {
	try {
		const todo = await prisma.todo.delete({ where: { id } });
		if (!todo) throw new NotFoundError("Error deleting Todo");
		return todo;
	} catch (error) {
		console.error("Error deleting Todo with id " + id);
		throw error;
	}
}

export async function deleteTodos() {
	try {
		return await prisma.todo.deleteMany();
	} catch (error) {
		console.error("Error deleting Todos");
		throw error;
	}
}
