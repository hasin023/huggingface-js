import { Elysia } from "elysia"

const app = new Elysia()

app.listen(process.env.SERVER_PORT || 3049)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
