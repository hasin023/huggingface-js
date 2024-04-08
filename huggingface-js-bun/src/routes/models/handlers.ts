import hf from "../../config/huggingFace"

const ImageToText = async (imgURL: string, model: string) => {
  const response = await fetch(imgURL)
  const imageBlob = await response.blob()

  const result = await hf.imageToText({
    data: imageBlob,
    model: model,
  })

  return result
}

const SummarizeContent = async (
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

export { ImageToText, SummarizeContent }
