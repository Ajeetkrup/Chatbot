import React from 'react';
import styles from './ChatToggle.module.css';

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className={`${styles.chatToggle} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? '✕' : '💬'}
    </button>
  );
};
