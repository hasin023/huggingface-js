import { Context, Elysia } from "elysia"
import {
  ImageToText,
  SummarizeContent,
  FillMasked,
  Translate,
} from "./handlers"
import handleRequest from "../../utils/handleRequest"

const modelRoutes = new Elysia({
  prefix: "/models",
})
  .post("/imageToText", async ({ body, set }: Context) => {
    interface ImageToTextRequest {
      imgURL: string
      model: string
    }
    const { imgURL, model } = body as ImageToTextRequest
    return handleRequest(ImageToText.bind(null, imgURL, model), body, set)
  })
  .post("/summary", async ({ body, set }: Context) => {
    interface SummaryContent {
      content: string
      model: string
      maxLength: number
    }
    const { content, model, maxLength } = body as SummaryContent
    return handleRequest(
      SummarizeContent.bind(null, content, model, maxLength),
      body,
      set
    )
  })
  .post("/fillmask", async ({ body, set }: Context) => {
    interface MaskingContent {
      inputs: string
      model: string
    }
    const { inputs, model } = body as MaskingContent
    return handleRequest(FillMasked.bind(null, inputs, model), body, set)
  })
  .post("/translate", async ({ body, set }: Context) => {
    interface TranslateContent {
      inputs: string
      model: string
      parameters: any
    }
    const { inputs, model, parameters } = body as TranslateContent
    return handleRequest(
      Translate.bind(null, inputs, model, parameters),
      body,
      set
    )
  })

export default modelRoutes
