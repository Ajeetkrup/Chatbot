import axios from 'axios';
import type { ChatResponse, ApiError } from '../types/chat.types';
import { CHAT_CONFIG } from '../utils/constants';

const chatApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatService = {
  sendMessage: async (message: string): Promise<ChatResponse> => {
    try {
      const response = await chatApi.post<ChatResponse>(CHAT_CONFIG.API_ENDPOINT, {
        message,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || CHAT_CONFIG.ERROR_MESSAGE,
          status: error.response?.status,
        };
        throw apiError;
      }
      throw new Error(CHAT_CONFIG.ERROR_MESSAGE);
    }
  },
};
