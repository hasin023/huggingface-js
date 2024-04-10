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
  ZeroShotClassify,
  SentenceSimilarity,
  TextToSpeech,
  ClassifyImage,
  ClassifyObject,
  ImageSegment,
  ImageText,
  TextToImage,
} from "./handlers"
import {
  ImageClassificationSchema,
  ImageToTextSchema,
  MaskingContentSchema,
  QuestionAnswerSchema,
  SimilarSentenceSchema,
  SummaryContentSchema,
  TableQuestionSchema,
  TextClassificationSchema,
  TextGenerationSchema,
  TextToImageSchema,
  TextToSpeechSchema,
  TokenClassificationSchema,
  TranslateContentSchema,
  ZeroShotSchema,
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
  .post("/zeroshotclassify", async ({ body, set }: Context) => {
    const { model, inputs, parameters } = body as ZeroShotSchema
    const { candidate_labels } = parameters
    return handleRequest(
      ZeroShotClassify.bind(null, model, inputs, candidate_labels),
      body,
      set
    )
  })
  .post("/similarity", async ({ body, set }: Context) => {
    const { model, inputs } = body as SimilarSentenceSchema
    const { source_sentence, sentences } = inputs
    return handleRequest(
      SentenceSimilarity.bind(null, model, source_sentence, sentences),
      body,
      set
    )
  })
  .post("/textToSpeech", async ({ body, set }: Context) => {
    const { model, inputs } = body as TextToSpeechSchema
    return handleRequest(TextToSpeech.bind(null, model, inputs), body, set)
  })
  .post("/imgClassification", async ({ body, set }: Context) => {
    const { model, data } = body as ImageClassificationSchema
    return handleRequest(ClassifyImage.bind(null, model, data), body, set)
  })
  .post("/objectClassification", async ({ body, set }: Context) => {
    const { model, data } = body as ImageClassificationSchema
    return handleRequest(ClassifyObject.bind(null, model, data), body, set)
  })
  .post("/imageSegment", async ({ body, set }: Context) => {
    const { model, data } = body as ImageClassificationSchema
    return handleRequest(ImageSegment.bind(null, model, data), body, set)
  })
  .post("/imageText", async ({ body, set }: Context) => {
    const { model, data } = body as ImageClassificationSchema
    return handleRequest(ImageText.bind(null, model, data), body, set)
  })
  .post("/textToImage", async ({ body, set }: Context) => {
    const { model, inputs, parameters } = body as TextToImageSchema
    return handleRequest(
      TextToImage.bind(null, model, inputs, parameters),
      body,
      set
    )
  })

export default modelRoutes
