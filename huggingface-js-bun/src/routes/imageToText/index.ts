import { Context, Elysia } from "elysia"
import { ImageToText } from "./handlers"

interface ImageToTextRequest {
  imgURL: string
  model: string
}

const imageToTextRoutes = new Elysia({
  prefix: "/imageToText",
}).post("/", async ({ body, set }: Context) => {
  try {
    const { imgURL, model } = body as ImageToTextRequest
    // console.log("Request:", imgURL)
    // console.log("Model:", model)

    const response = await ImageToText(imgURL, model)

    if (!response) {
      set.status = 501
      console.log("Error: Image to text failed")
    } else {
      set.status = 200
      set.headers["Content-Type"] = "application/json"

      return new Response(JSON.stringify(response))
    }
  } catch (error) {
    console.error("Error:", error)
    set.status = 400
    return new Response("Bad request")
  }
})

export default imageToTextRoutes
