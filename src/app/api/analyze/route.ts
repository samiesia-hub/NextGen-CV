import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
      Extract the CV information from the following text and return it strictly as a JSON object matching this schema:
      {
        "personalInfo": {
          "name": "string",
          "email": "string",
          "phone": "string",
          "location": "string",
          "profile": "string"
        },
        "sidebarSections": [
          {
            "title": "string",
            "type": "link | language | quality",
            "items": []
          }
        ],
        "mainSections": [
          {
            "title": "string",
            "items": [
              {
                "title": "string",
                "subtitle": "string",
                "period": "string",
                "description": "string",
                "bullets": ["string"]
              }
            ]
          }
        ]
      }

      Important:
      - For sidebarSections, use 'link' for URLs, 'language' for languages, and 'quality' for others.
      - For languages, items should be objects like { "name": "English", "dots": 4 }.
      - For links, items should be objects like { "icon": "fab fa-github", "text": "github.com/user", "href": "url" }.
      - For qualities, items should be simple strings.
      
      Text:
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().replace(/```json|```/g, "").trim();
    const data = JSON.parse(jsonText);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
