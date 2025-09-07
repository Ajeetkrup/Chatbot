import { useState, useCallback } from "react";
import type { Message } from "../types/chat.types";
import { chatService } from "../services/chatService";
import { CHAT_CONFIG } from "../utils/constants";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      text: CHAT_CONFIG.GREETING_MESSAGE,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatService.sendMessage(text.trim());

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response.message,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : CHAT_CONFIG.ERROR_MESSAGE;

      setError(errorMessage);

      const errorMessageObj: Message = {
        id: `error-${Date.now()}`,
        text: errorMessage,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "greeting",
        text: CHAT_CONFIG.GREETING_MESSAGE,
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};
