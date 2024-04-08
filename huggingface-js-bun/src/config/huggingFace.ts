import { HfInference } from "@huggingface/inference"

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN

const hf = new HfInference(HF_ACCESS_TOKEN)

export default hf
