import { Context } from "elysia"

const handleRequest = async (
  handler: Function,
  body: any,
  set: Context["set"]
) => {
  try {
    const response = await handler(body)
    if (!response) {
      set.status = 501
      console.log("Error: Request failed")
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
}

export default handleRequest
