import axios from 'axios';

const httpConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPEN_AI_SECRET_KEY
    }
};

const model = 'text-davinci-003';
const OPEN_AI_URL = `https://api.openai.com/v1/engines/${model}/completions`;

export default async function TweetGenerator(req, res) {
    if (req.method === 'POST') {
        try {
            const reqData = {
                prompt: `This is a users last tweet: ${req.body.tweet}, Based on this last tweet generate next tweet`,
                max_tokens: 1000
            };
            const response = await axios.post(OPEN_AI_URL, reqData, httpConfig);

            res.status(200).json({
                data: response.data.choices[0].text,
                success: true
            });
        } catch (error) {
            res.status(400).json({
                data: error,
                success: false
            });
        }
    }
}
