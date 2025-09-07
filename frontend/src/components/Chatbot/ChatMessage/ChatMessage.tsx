import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Message } from "../../../types/chat.types";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`${styles.message} ${
        message.isUser ? styles.user : styles.bot
      }`}
    >
      <div
        className={`${styles.messageContent} ${
          message.isUser ? styles.user : styles.bot
        }`}
      >
        {message.isUser ? (
          <div className={styles.messageText}>{message.text}</div>
        ) : (
          <div className={styles.messageText}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom components for styling
                table: ({ children }) => (
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className={styles.tableHead}>{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className={styles.tableBody}>{children}</tbody>
                ),
                tr: ({ children }) => (
                  <tr className={styles.tableRow}>{children}</tr>
                ),
                th: ({ children }) => (
                  <th className={styles.tableHeader}>{children}</th>
                ),
                td: ({ children }) => (
                  <td className={styles.tableCell}>{children}</td>
                ),
                h1: ({ children }) => (
                  <h1 className={styles.heading1}>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className={styles.heading2}>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className={styles.heading3}>{children}</h3>
                ),
                p: ({ children }) => (
                  <p className={styles.paragraph}>{children}</p>
                ),
                code: ({ children, className }) => (
                  <code className={`${styles.inlineCode} ${className || ""}`}>
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className={styles.codeBlock}>{children}</pre>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className={styles.list}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className={styles.orderedList}>{children}</ol>
                ),
                li: ({ children }) => (
                  <li className={styles.listItem}>{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className={styles.blockquote}>
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className={styles.bold}>{children}</strong>
                ),
                em: ({ children }) => (
                  <em className={styles.italic}>{children}</em>
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        )}
        <div
          className={`${styles.timestamp} ${message.isUser ? styles.user : ""}`}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};
