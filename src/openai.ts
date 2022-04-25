import {Configuration, OpenAIApi} from 'openai';
const config = new Configuration({
    apiKey: process.env.OPENAI_KEY
});
export const openapi = new OpenAIApi(config);