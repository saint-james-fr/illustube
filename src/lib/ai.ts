import { get } from "svelte/store";
import { apiKeyStore } from "stores";

export const generateAIImage = async (prompt: string): Promise<string> => {
  const { key, isValid } = get(apiKeyStore);

  if (!isValid || !key) {
    throw new Error("Please provide a valid API key");
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate image");
  }

  const data = await response.json();
  return `data:image/png;base64,${data.data[0].b64_json}`;
};
