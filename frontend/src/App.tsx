import React, { useState } from 'react';
import { Chatbot } from './components/Chatbot';
import { ChatToggle } from './components/ChatToggle';
import "./App.css";

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Demo</h1>
        <p>Chat with us using the chat button in the bottom right corner!</p>
      </header>

      <main>
        {/* Your main content here */}
        <p>Under Development</p>
      </main>

      {/* Chat Components */}
      <ChatToggle isOpen={isChatOpen} onClick={toggleChat} />
      <Chatbot isOpen={isChatOpen} onClose={closeChat} />
    </div>
  );
};

export default App;