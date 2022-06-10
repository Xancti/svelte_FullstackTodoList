<script context="module" lang="ts">
    // Module is only executed once across all instances; like onMount?
    // Import load from sveltejs/kit
    // create load async function which calls fetch
    // resolution = await fetch of /todos.json (the api)
    // IF: resolution.ok, set todos as res.json()
    // return todos object as a prop
    // ELSE: return error message 

    import type { Load } from "@sveltejs/kit";
    
    export const load: Load = async ({ fetch }) => {
        const res = await fetch("/todos.json");
        // essentially a get request

        if (res.ok) {
            const todos = await res.json();
            return {
                props: { todos }
            }
        }

        const { message } = await res.json();
        return {
            error: new Error(message)
        }
    };
</script>

<script lang="ts">
    // Executed every time a component is rendered
    import TodoItem from "$lib/todo-item.svelte";

    // This is how we specify a prop
    export let todos: Todo[];
    

    const title = "Todo | New";
</script>

<style>
    .todos {
        width: 100%;
        max-width: 42rem;
        margin: 4rem auto 0 auto;
    }

    .new {
        margin: 0 0 0.5rem 0;
    }

    .new input{
        font-size: 28px;
        width: 100%;
        padding: 0.5em 1em 0.3em 1em;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        text-align: center;
    }

    .todos :global(input) {
        border: 1px solid transparent;
    }

    .todos :global(input:focus-visible) {
        box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #ff3e00 !important;
        outline: none;
    }
</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
    <h1>{title}</h1>
    
    <form action="/todos.json" method="post" class="new">
        <input type="text" name="todoInput" aria-label="Add a todo" placeholder="+ tap to add a todo">
    </form>
    
    {#each todos as todo}
        <TodoItem {todo}/>
        <!-- Something about passing props that sends all the data over; 
             in effect it is bidirectional comms? -->
    {/each}

</div>