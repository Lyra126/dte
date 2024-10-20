const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function generateJournal(prompt) {
    //const dotenv = require("dotenv");
    //dotenv.config();
    const API_KEY = 'AIzaSyCpjgXeQKRUNwEJHBWUTNN_WJcxIlyuZsA';
    // Access API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(API_KEY);
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const request = "Use information: " + prompt + " to suggest a helpful journaling prompt in the context of postpartum. Limit to 30 words.";
    
    const result = await model.generateContent(request);
    const response = await result.response;
    const text = response.text();
    return text;
  }

  export default generateJournal