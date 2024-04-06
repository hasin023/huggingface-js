import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
const PORT = process.env.SERVER_PORT || 8080;

const hf = new HfInference(HF_ACCESS_TOKEN);

const model = "nlpconnect/vit-gpt2-image-captioning";
const img_url = "https://c4.wallpaperflare.com/wallpaper/79/286/391/maclaren-supercar-performance-car-maclaren-p1-wallpaper-preview.jpg";

const response = await fetch(img_url);
const imageBlob = await response.blob();

const imgresult = await hf.imageToText({
    data: imageBlob,
    model: model,

});

const summary = await hf.summarization({
    model: 'facebook/bart-large-cnn',
    inputs:
        'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930.',
    parameters: {
        max_length: 70
    }
})

app.get("/image-to-text", async (req, res) => {
    res.send(imgresult);
});

app.get("/summary", async (req, res) => {
    res.send(summary);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});