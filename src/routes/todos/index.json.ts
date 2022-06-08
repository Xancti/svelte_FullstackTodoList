import type { RequestHandler } from "@sveltejs/kit";

// TODO: Persist in databse
let todos: Todo[] = [];

export const get: RequestHandler = async ({ request }) => {
  return {
    status: 200,
    body: todos
  }
}

export const post: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  todos.push({
    created_at: new Date(),
    text: formData.get("todoInput") as string,   
    done: false
  });

  return {
    status: 303,
    headers: {
        location: "/"
    }
  }
}