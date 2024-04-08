import { Elysia } from "elysia"

const summaryRoutes = new Elysia({
  prefix: "/summary",
}).get("/", async () => {
  console.log("GET /summary")
})

export default summaryRoutes
