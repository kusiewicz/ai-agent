import OpenAI from "openai";
import { reddit, redditToolDefinition } from "./tools/reddit";
import {
  generateImage,
  generateImageToolDefinition,
} from "./tools/generateImage";

const getWeather = () => "hot, 90deg";

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
  };

  switch (toolCall.function.name) {
    case generateImageToolDefinition.name:
      return generateImage(input);
    case redditToolDefinition.name:
      return reddit(input);
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`);
  }
};
