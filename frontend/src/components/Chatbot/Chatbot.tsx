import React, { useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import styles from './Chatbot.module.css';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ADD THIS: Scroll to bottom when chatbot is opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the component is fully rendered
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3 className={styles.chatTitle}>Chat Support</h3>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className={styles.loadingIndicator}>
            Bot is typing
            <div className={styles.loadingDots}>
              <div className={styles.loadingDot} />
              <div className={styles.loadingDot} />
              <div className={styles.loadingDot} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};