const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/images/generations";

export const generateAIImage = async (prompt: string): Promise<string> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
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
