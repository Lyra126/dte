const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateSleep(prompt) {
    //const dotenv = require("dotenv");
    //dotenv.config();
    const API_KEY = 'AIzaSyCpjgXeQKRUNwEJHBWUTNN_WJcxIlyuZsA';
    // Access API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(API_KEY);
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const request = "Use information: " + prompt + " to suggest help for sleeping in the context of postpartum.";
    
    const result = await model.generateContent(request);
    const response = await result.response;
    const text = response.text();
    return text;
  }
  
  export default generateSleep