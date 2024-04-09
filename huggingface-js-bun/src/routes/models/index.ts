import { Context, Elysia } from "elysia"
import handleRequest from "../../utils/handleRequest"
import {
  ImageToText,
  SummarizeContent,
  FillMasked,
  Translate,
  AnswerQuestion,
  AnswerTableQuestion,
  ClassifyText,
  GenerateText,
  ClassifyToken,
} from "./handlers"
import {
  ImageToTextSchema,
  MaskingContentSchema,
  QuestionAnswerSchema,
  SummaryContentSchema,
  TableQuestionSchema,
  TextClassificationSchema,
  TextGenerationSchema,
  TokenClassificationSchema,
  TranslateContentSchema,
} from "../../Types/types"

const modelRoutes = new Elysia({
  prefix: "/models",
})
  .post("/imageToText", async ({ body, set }: Context) => {
    const { imgURL, model } = body as ImageToTextSchema
    return handleRequest(ImageToText.bind(null, imgURL, model), body, set)
  })
  .post("/summary", async ({ body, set }: Context) => {
    const { content, model, maxLength } = body as SummaryContentSchema
    return handleRequest(
      SummarizeContent.bind(null, content, model, maxLength),
      body,
      set
    )
  })
  .post("/fillmask", async ({ body, set }: Context) => {
    const { inputs, model } = body as MaskingContentSchema
    return handleRequest(FillMasked.bind(null, inputs, model), body, set)
  })
  .post("/translate", async ({ body, set }: Context) => {
    const { inputs, model, parameters } = body as TranslateContentSchema
    return handleRequest(
      Translate.bind(null, inputs, model, parameters),
      body,
      set
    )
  })
  .post("/qna", async ({ body, set }: Context) => {
    const { model, inputs } = body as QuestionAnswerSchema
    const { question, context } = inputs
    return handleRequest(
      AnswerQuestion.bind(null, question, context, model),
      body,
      set
    )
  })
  .post("/tableqna", async ({ body, set }: Context) => {
    const { model, inputs } = body as TableQuestionSchema
    const { query, table } = inputs
    return handleRequest(
      AnswerTableQuestion.bind(null, model, query, table),
      body,
      set
    )
  })
  .post("/classify", async ({ body, set }: Context) => {
    const { model, inputs } = body as TextClassificationSchema
    return handleRequest(ClassifyText.bind(null, model, inputs), body, set)
  })
  .post("/generate", async ({ body, set }: Context) => {
    const { model, inputs, parameters } = body as TextGenerationSchema
    return handleRequest(
      GenerateText.bind(null, model, inputs, parameters),
      body,
      set
    )
  })
  .post("/classifyToken", async ({ body, set }: Context) => {
    const { model, inputs } = body as TokenClassificationSchema
    return handleRequest(ClassifyToken.bind(null, model, inputs), body, set)
  })

export default modelRoutes
