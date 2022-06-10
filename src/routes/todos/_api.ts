// This file is meant to be accessed by the two other endpoints (.ts files in route)
// Depending on whether it is a GET or POST request, return different results
// GET/POST can be differentiated via the status code?

// TODO: Persist in databse
import type { RequestEvent } from "@sveltejs/kit";

let todos: Todo[] = [];

export const api = (event: RequestEvent, todo?: Todo) => {
    // Setting default behavior if switch cases aren't met
    let body = {};
    let status = 500;
    console.log(`${event}`)

    switch (event.method.toUpperCase()) {
        case "GET":
            body = todos;
            status = 200;
            console.log('GET case in api.ts')
            break;
        
        case "POST":
            todos.push(todo);
            body = todo;
            status = 201;
            console.log('POST case in api.ts')
            break;

        case "DELETE":
            console.log('DELETE case in api.ts')
            console.log(`${event.params.uid}`)
            // todos = todos.filter(todo => todo.uid !== event.params.uid)
            // status = 200;
            // console.log(`${event.method}`)
            break;


        default:
            break;
    }

    if (event.method.toUpperCase() !== "GET") {
        console.log('NOT == GET')
        return {
            status: 303,
            headers: {
                location: "/"
            }
        };
    }

    console.log("RETURN IN API")
    return {
        status,
        body
    }
}