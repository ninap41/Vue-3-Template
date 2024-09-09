import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts"

const app = new Hono()
// @ts-ignore - remove when KV is not in Beta
const kv = await Deno.openKv()

// Redirect root URL
app.get("/", (c) => c.redirect("/trees"))

// List all trees
app.get("/trees", async (c) => {
	const iter = await kv.list({ prefix: ["trees"] })
	const trees = []
	for await (const res of iter) trees.push(res)
	return c.json(trees)
})

// Create a tree (POST body is JSON)
app.post("/trees", async (c) => {
	const body = await c.req.json()
	const result = await kv.set(["trees", body.title], body)
	return c.json(result)
})

// Update Tree by title (POST body is JSON)

app.put("/trees/:title", async (c) => {
	const title = c.req.param("title")
	const result = await kv.set(["trees", title], await c.req.json())
	return c.json(result)
})

// Get a tree by title
app.get("/trees/:title", async (c) => {
	const title = c.req.param("title")
	const result = await kv.get(["trees", title])
	return c.json(result)
})

// Delete a tree by title
app.delete("/trees/:title", async (c) => {
	const title = c.req.param("title")
	await kv.delete(["trees", title])
	return c.text("")
})

Deno.serve(app.fetch)
