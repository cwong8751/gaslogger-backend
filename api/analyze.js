import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        error: "Missing image",
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Describe this image and extract any visible text."
            },
            {
              type: "input_image",
              image_url: image
            }
          ]
        }
      ]
    });

    return res.status(200).json({
      result: response.output_text
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
}