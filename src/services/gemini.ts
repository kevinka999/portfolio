import { GoogleGenAI, Part } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

type ChatHistory = {
  role: "user" | "model";
  message: string;
}[];

const chatHistories: ChatHistory = [];

export class GeminiService {
  private static instance: GeminiService;
  private modelName = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

  private constructor() {}

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }

    return GeminiService.instance;
  }

  public async generateResponse(
    message: string,
    systemPrompt?: string,
    language: string = "pt-BR",
  ): Promise<string> {
    try {
      const parts: Part[] = [];
      if (systemPrompt) parts.push({ text: systemPrompt });
      if (chatHistories.length > 0) parts.push({ text: this.getChatHistory() });

      parts.push({ text: this.createLanguagePrompt(language) });
      parts.push({ text: `Now answer the user's message: ${message}` });

      const result = await ai.models.generateContent({
        model: this.modelName,
        contents: [{ role: "user", parts }],
      });

      const responseText =
        result.text || "Desculpe, não consegui gerar uma resposta.";

      chatHistories.push({ role: "user", message });
      chatHistories.push({ role: "model", message: responseText });

      return responseText;
    } catch (error) {
      console.error("Error generating response:", error);
      return "Desculpe, ocorreu um erro ao processar sua mensagem.";
    }
  }

  private getChatHistory(): string {
    return `The conversation history is:\n${chatHistories.map((msg) => `${msg.role}: ${msg.message}`).join("\n")}`;
  }

  private createLanguagePrompt(language: string): string {
    switch (language.toLowerCase()) {
      case "en-us":
        return "Answer the user's following question in: English, do not use any other language.";
      default:
        return "Answer the user's following question in: Portuguese, do not use any other language.";
    }
  }

  public clearHistory(): void {
    chatHistories.splice(0, chatHistories.length);
  }
}

export const geminiService = GeminiService.getInstance();
