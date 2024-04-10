import hf from "../../config/huggingFace"
const fs = require("fs")
const path = require("path")

export const ImageToText = async (imgURL: string, model: string) => {
  const response = await fetch(imgURL)
  const imageBlob = await response.blob()

  const result = await hf.imageToText({
    data: imageBlob,
    model: model,
  })

  return result
}

export const SummarizeContent = async (
  content: string,
  model: string,
  maxLength: number
) => {
  const result = await hf.summarization({
    model: model,
    inputs: content,
    parameters: {
      max_length: maxLength,
    },
  })

  return result
}

export const FillMasked = async (inputs: string, model: string) => {
  const result = await hf.fillMask({
    model: model,
    inputs: inputs,
  })

  return result
}

export const Translate = async (
  inputs: string,
  model: string,
  parameters?: any
) => {
  const result = await hf.translation({
    model: model,
    inputs: inputs,
  })

  return result
}

export const AnswerQuestion = async (
  question: string,
  context: string,
  model: string
) => {
  const result = await hf.questionAnswering({
    model: model,
    inputs: {
      question: question,
      context: context,
    },
  })

  return result
}

export const AnswerTableQuestion = async (
  model: string,
  query: string,
  table: any
) => {
  const result = await hf.tableQuestionAnswering({
    model: model,
    inputs: {
      query: query,
      table: table,
    },
  })

  return result
}

export const ClassifyText = async (model: string, inputs: string) => {
  const result = await hf.textClassification({
    model: model,
    inputs: inputs,
  })

  return result
}

export const GenerateText = async (
  model: string,
  inputs: string,
  parameters?: any
) => {
  const result = await hf.textGeneration({
    model: model,
    inputs: inputs,
    parameters: parameters,
  })

  return result
}

export const ClassifyToken = async (model: string, inputs: string) => {
  const result = await hf.tokenClassification({
    model: model,
    inputs: inputs,
  })

  return result
}

export const ZeroShotClassify = async (
  model: string,
  inputs: string[],
  candidate_labels: string[]
) => {
  const result = await hf.zeroShotClassification({
    model: model,
    inputs: inputs,
    parameters: {
      candidate_labels: candidate_labels,
    },
  })

  return result
}

export const SentenceSimilarity = async (
  model: string,
  source_sentence: string,
  sentences: string[]
) => {
  const result = await hf.sentenceSimilarity({
    model: model,
    inputs: {
      source_sentence: source_sentence,
      sentences: sentences,
    },
  })

  return result
}

export const TextToSpeech = async (model: string, inputs: string) => {
  const result = await hf.textToSpeech({
    model: model,
    inputs: inputs,
  })

  return result
}

export const ClassifyImage = async (model: string, data: string) => {
  const result = await hf.imageClassification({
    model: model,
    data: fs.readFileSync(data),
  })

  return result
}

export const ClassifyObject = async (model: string, data: string) => {
  const result = await hf.objectDetection({
    model: model,
    data: fs.readFileSync(data),
  })

  return result
}

export const ImageSegment = async (model: string, data: string) => {
  const result = await hf.imageSegmentation({
    model: model,
    data: fs.readFileSync(data),
  })

  return result
}

export const ImageText = async (model: string, data: string) => {
  const result = await hf.imageToText({
    model: model,
    data: fs.readFileSync(data),
  })

  return result
}

export const TextToImage = async (
  model: string,
  inputs: string,
  parameters?: any
) => {
  const response = await hf.textToImage({
    model: model,
    inputs: inputs,
    parameters: parameters,
  })

  const imageBlob = response
  console.log(imageBlob)
  const img: any = await blobToImage(imageBlob)

  console.log(img)

  const directory = path.join(__dirname, "../../../assets")
  const fileName = "generated_image.png"

  const filePath = path.join(directory, fileName)

  const canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext("2d")
  ctx?.drawImage(img, 0, 0)

  const buffer = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "")
  const imageBuffer = Buffer.from(buffer, "base64")

  fs.writeFile(filePath, imageBuffer, (err: any) => {
    if (err) {
      console.error("Error saving image:", err)
    } else {
      console.log(`Image saved as ${filePath}`)
    }
  })

  return true
}

const blobToImage = (blob: Blob) => {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob)
    let img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.src = url
  })
}
