// Meant to intercept requests before they hit the API
import type { Handle } from "@sveltejs/kit";

// The idea is to intercept the request
// Check if query has a _method,
// IF it does:
// Set the requests method to whatever value is associated with _method
// event.request.method = event.url.searchParams.get("_method").toUpperCase();
export const handle: Handle = async ({ event, resolve }) => {
    // if (event.url.searchParams.has("_method")) {
    //     console.log(`${event.url}`)
    // }

    const response = await resolve(event);
    console.log('Triggered: Handle Function in Hooks.ts')
    return response;
};