import { Elysia, t } from "elysia";
import { getTodos, createTodo, getTodoById, updateTodo, deleteTodo, deleteTodos } from "./handler";

const todoRoutes = new Elysia({ prefix: "/todos" })
	.get("/", () => getTodos())
	.post("/", ({ body }) => createTodo(body), {
		body: t.Object({
			title: t.String(),
			description: t.String()
		})
	})
	.delete("/", () => deleteTodos())
	.get("/:id", ({ params: { id } }) => getTodoById(Number(id)), {
		params: t.Object({ id: t.Numeric() })
	})
	.patch("/:id", ({ params: { id }, body }) => updateTodo(id, body), {
		params: t.Object({ id: t.Numeric() }),
		body: t.Object({
			title: t.Optional(t.String()),
			description: t.Optional(t.String()),
			completed: t.Optional(t.Boolean())
		})
	})
	.delete("/:id", ({ params: { id } }) => deleteTodo(Number(id)), {
		params: t.Object({ id: t.Numeric() })
	});

export default todoRoutes;
