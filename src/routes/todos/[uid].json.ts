// Square brackets tells sveltekit that the object inside is dynamic
import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const del: RequestHandler = (event) => {
    console.log(`Returning ${event.request.method}`)
    return api(event);


}