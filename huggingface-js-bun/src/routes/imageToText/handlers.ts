import { Context } from "elysia"
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

export { ImageToText }
