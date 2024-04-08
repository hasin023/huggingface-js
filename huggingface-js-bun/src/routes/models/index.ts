import { Context, Elysia } from "elysia"
import { ImageToText, SummarizeContent } from "./handlers"

const imageToTextRoutes = new Elysia({
  prefix: "/models",
})
  .post("/imageToText", async ({ body, set }: Context) => {
    try {
      interface ImageToTextRequest {
        imgURL: string
        model: string
      }

      const { imgURL, model } = body as ImageToTextRequest
      const response = await ImageToText(imgURL, model)

      if (!response) {
        set.status = 501
        console.log("Error: Image to text failed")
      } else {
        set.status = 200
        set.headers["Content-Type"] = "application/json"

        console.log("Response Status: Successful")
        return new Response(JSON.stringify(response))
      }
    } catch (error) {
      console.error("Error:", error)
      set.status = 400
      return new Response("Bad request")
    }
  })
  .post("/summary", async ({ body, set }: Context) => {
    try {
      interface SummaryContent {
        content: string
        model: string
        maxLength: number
      }

      const { content, model, maxLength } = body as SummaryContent
      const response = await SummarizeContent(content, model, maxLength)

      if (!response) {
        set.status = 501
        console.log("Error: Image to text failed")
      } else {
        set.status = 200
        set.headers["Content-Type"] = "application/json"

        console.log("Response Status: Successful")
        return new Response(JSON.stringify(response))
      }
    } catch (error) {
      console.error("Error:", error)
      set.status = 400
      return new Response("Bad request")
    }
  })

export default imageToTextRoutes
