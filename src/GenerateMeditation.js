const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateMeditation(prompt) {
  //const dotenv = require("dotenv");
  //dotenv.config();
  const API_KEY = 'AIzaSyCpjgXeQKRUNwEJHBWUTNN_WJcxIlyuZsA';
  // Access API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  const request = "Use information: " + prompt + " to suggest meditation routine in the context of postpartum. It must be set in this format with no astericks: 'name: Deep Breathing, duration: 12, name: Body Scan, duration: 18, name: Loving-Kindness Meditation, duration: 18' Replace the name and duration contents. Duration must be below 30";
  
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
  //console.log(exercises);
  return exercises;
}

export default generateMeditation