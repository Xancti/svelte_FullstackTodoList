import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

// Global file

export const get: RequestHandler = async ({ request }) => {
  return api(request);
}

export const post: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  return api(request, {
    uid: `${Date.now()}`, // TODO: Replace with UID from database
    created_at: new Date(),
    text: formData.get("todoInput") as string,   
    done: false
  });
}