import { Elysia } from "elysia"
import swagger from "@elysiajs/swagger"

const app = new Elysia()

// Routes
import imageToTextRoutes from "./routes/models"

app
  .use(swagger())
  .group("/api", (app) => {
    app.use(imageToTextRoutes)

    return app
  })
  .listen(process.env.SERVER_PORT || 3049)

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
)
