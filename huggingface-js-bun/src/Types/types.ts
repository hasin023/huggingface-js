export type ImageToTextSchema = {
  imgURL: string
  model: string
}

export type SummaryContentSchema = {
  content: string
  model: string
  maxLength: number
}

export type MaskingContentSchema = {
  inputs: string
  model: string
}

export type TranslateContentSchema = {
  inputs: string
  model: string
  parameters: any
}

export type QuestionAnswerSchema = {
  model: string
  inputs: {
    question: string
    context: string
  }
}

export type TableQuestionSchema = {
  model: string
  inputs: {
    query: string
    table: any
  }
}
