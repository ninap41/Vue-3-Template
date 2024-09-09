# Deno Server

# Install

```jsx
curl -fsSL https://deno.land/x/install/install.sh | sh
```

## Verify

```jsx
deno --version
```

# Create Server

create a file like `deno-server.ts`

```jsx
import { serve } from "https://deno.land/std/http/server.ts"

const s = serve({ port: 8000 })
console.log("Server running on http://localhost:8000")

for await (const req of s) {
	req.respond({ body: "Hello, Deno!" })
}
```

# Run

```jsx
deno run --allow-net app.ts

```

check your server at [`http://localhost:8000`](http://localhost:8000/)

# Deno Online Tools

use github

https://dash.deno.com/projects/

```
deno run --allow-net server.ts
```
