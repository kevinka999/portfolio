import { useGlobal } from "@/hooks/useGlobal";
import { geminiService } from "@/services/gemini";
import React from "react";

type UseAIChatProps = {
  systemPrompt?: string;
};

type UseAIChatReturn = {
  generateResponse: (message: string) => Promise<string>;
  clearHistory: () => void;
  isLoading: boolean;
  error: string | null;
};

export const useAIChat = ({
  systemPrompt,
}: UseAIChatProps): UseAIChatReturn => {
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { currentLanguage } = useGlobal();

  const generateResponse = React.useCallback(
    async (message: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await geminiService.generateResponse(
          message,
          systemPrompt,
          currentLanguage,
        );
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error generating response";
        setError(errorMessage);
        return "Sorry, an error occurred while processing your message.";
      } finally {
        setIsLoading(false);
      }
    },
    [systemPrompt, currentLanguage],
  );

  const clearHistory = geminiService.clearHistory;

  return {
    generateResponse,
    clearHistory,
    isLoading,
    error,
  };
};
