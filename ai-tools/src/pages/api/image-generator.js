import axios from 'axios';

const OPEN_AI_IMAGE_URL = 'https://api.openai.com/v1/images/generations';
const MODEL = 'image-alpha-001';
const IMAGE_SIZE = '1024x1024';
const RESPONSE_FORMAT = 'url';
const httpConfig = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.OPEN_AI_SECRET_KEY
    }
};

export default async function ImageGeneratorHandler(req, res) {
    try {
        const requestData = {
            model: MODEL,
            prompt: req.body.userCommand,
            size: IMAGE_SIZE,
            response_format: RESPONSE_FORMAT
        };

        const response = await axios.post(
            OPEN_AI_IMAGE_URL,
            requestData,
            httpConfig
        );

        res.status(200).json({ imageURL: response.data.data[0].url });
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
}
