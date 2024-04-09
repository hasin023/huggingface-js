type LLMSchema = {
  model: string
}

export interface ImageToTextSchema extends LLMSchema {
  imgURL: string
}

export interface SummaryContentSchema extends LLMSchema {
  content: string
  maxLength: number
}

export interface MaskingContentSchema extends LLMSchema {
  inputs: string
}

export interface TranslateContentSchema extends LLMSchema {
  inputs: string
  parameters: any
}

export interface QuestionAnswerSchema extends LLMSchema {
  inputs: {
    question: string
    context: string
  }
}

export interface TableQuestionSchema extends LLMSchema {
  inputs: {
    query: string
    table: any
  }
}

export interface TextClassificationSchema extends LLMSchema {
  inputs: string
}

export interface TextGenerationSchema extends LLMSchema {
  inputs: string
  parameters?: any
}
