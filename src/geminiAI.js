const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateMeditation(prompt) {
  //const dotenv = require("dotenv");
  //dotenv.config();
  const API_KEY = 'AIzaSyCpjgXeQKRUNwEJHBWUTNN_WJcxIlyuZsA';
  // Access API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  const request = "Use information: " + prompt + " to suggest meditation routine in the context of postpartum. It must be set in this format with no astericks: 'name: Deep Breathing, duration: 120, name: Body Scan, duration: 180, name: Loving-Kindness Meditation, duration: 180' Replace the name and duration contents";
  
  const result = await model.generateContent(request);
  const response = await result.response;
  const text = response.text();
  const exerciseText = text;

  // Split the text by new lines and filter out empty lines
  const exercises = exerciseText.trim().split("\n").map(item => {
    const namePart = item.split(",")[0].split(":")[1].trim();  // Extract name
    const durationPart = item.split(",")[1].split(":")[1].trim();  // Extract duration
    
    return {
      name: namePart,
      duration: durationPart
    };
  });

  return text;
}

async function generateJournal(prompt) {
  //const dotenv = require("dotenv");
  //dotenv.config();
  const API_KEY = 'AIzaSyCpjgXeQKRUNwEJHBWUTNN_WJcxIlyuZsA';
  // Access API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  const request = "Use information: " + prompt + " to suggest a helpful journaling prompt in the context of postpartum";
  
  const result = await model.generateContent(request);
  const response = await result.response;
  const text = response.text();
  return text;
}

async function generateExercise(prompt) {
  //const dotenv = require("dotenv");
  //dotenv.config();
  const API_KEY = 'AIzaSyCpjgXeQKRUNwEJHBWUTNN_WJcxIlyuZsA';
  // Access API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  const request = "Use information: " + prompt + " to suggest a exercises in the context of postpartum";
  
  const result = await model.generateContent(request);
  const response = await result.response;
  const text = response.text();
  return text;
}

async function generateSleep(prompt) {
  //const dotenv = require("dotenv");
  //dotenv.config();
  const API_KEY = 'AIzaSyCpjgXeQKRUNwEJHBWUTNN_WJcxIlyuZsA';
  // Access API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  const request = "Use information: " + prompt + " to suggest help for sleeping in the context of postpartum";
  
  const result = await model.generateContent(request);
  const response = await result.response;
  const text = response.text();
  return text;
}

export default generateMeditation;