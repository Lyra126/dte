const { GoogleGenerativeAI } = require("@google/generative-ai");

async function GenerateMeditation(prompt) {
  //const dotenv = require("dotenv");
  //dotenv.config();
  const API_KEY = 'AIzaSyCpjgXeQKRUNwEJHBWUTNN_WJcxIlyuZsA';
  // Access API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  const request = "Use information: " + prompt + " to suggest meditation routine in the context of postpartum. Do not start with a title, go straight into the meditation routine.";
  
  const result = await model.generateContent(request);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

export default GenerateMeditation;