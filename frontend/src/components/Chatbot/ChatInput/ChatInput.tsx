import React, { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { CHAT_CONFIG } from '../../../utils/constants';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  return (
    <div className={styles.inputContainer}>
      <textarea
        ref={textareaRef}
        className={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={CHAT_CONFIG.PLACEHOLDER_TEXT}
        disabled={isLoading}
        rows={1}
      />
      <button
        className={styles.sendButton}
        onClick={handleSend}
        disabled={!inputValue.trim() || isLoading}
        aria-label="Send message"
      >
        {isLoading ? (
          <div className={styles.spinner} />
        ) : (
          CHAT_CONFIG.SEND_BUTTON_TEXT
        )}
      </button>
    </div>
  );
};
