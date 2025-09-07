export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
}
