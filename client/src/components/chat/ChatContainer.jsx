// src/components/ChatContainer.jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  height: 500px;
  padding: 10px;
  overflow-y: auto;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
`;

const ThinkingIndicator = styled.div`
  padding: 10px;
  border-radius: 10px;
  align-self: flex-start;
  background-color: #e4e6eb;
  color: black;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const ThinkingDots = styled.div`
  display: flex;
  align-items: center;
  
  span {
    background-color: #888;
    border-radius: 50%;
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 2px;
    animation: bounce 1.4s infinite ease-in-out both;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  margin: auto;
  max-width: 80%;
`;

const ChatContainer = ({ messages, isLoading }) => {
  const chatEndRef = useRef(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container>
      {messages.length === 0 ? (
        <WelcomeMessage>
          <h2>Welcome to Ollama Chat</h2>
          <p>Ask me anything and I'll respond using the selected model.</p>
        </WelcomeMessage>
      ) : (
        messages.map((message, index) => (
          <Message 
            key={message.id || index}
            text={message.text}
            isUser={message.isUser}
          />
        ))
      )}
      
      {isLoading && (
        <ThinkingIndicator>
          <ThinkingDots>
            <span></span>
            <span></span>
            <span></span>
          </ThinkingDots>
          &nbsp; Thinking...
        </ThinkingIndicator>
      )}
      
      <div ref={chatEndRef} />
    </Container>
  );
};

export default ChatContainer;