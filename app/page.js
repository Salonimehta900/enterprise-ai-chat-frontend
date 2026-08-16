"use client";

import { useState } from "react";

const suggestions = [
  "What is the leave policy?",
  "How do I claim an expense?",
  "Show me the work from home policy",
  "What are the IT security rules?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      text: "Hello! I’m Enterprise AI, your workplace knowledge assistant. Ask me about company policies, HR documents, procedures, or uploaded files.",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [file, setFile] = useState(null);

  function sendMessage(text = input) {
    const question = text.trim();

    if (!question || typing) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: question,
    };

    setMessages((oldMessages) => [
      ...oldMessages,
      userMessage,
    ]);

    setInput("");
    setTyping(true);

    // Temporary frontend response.
    // Later this will be replaced by your backend API.
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        text:
          "This is a demo response from the frontend. Later, your backend will connect this chat page to LangChain, RAG, ChromaDB and Gemini.",
      };

      setMessages((oldMessages) => [
        ...oldMessages,
        assistantMessage,
      ]);

      setTyping(false);
    }, 1000);
  }

  function startNewChat() {
    setMessages([
      {
        id: Date.now(),
        type: "assistant",
        text: "Hello! I’m Enterprise AI. How can I help you today?",
      },
    ]);

    setInput("");
    setFile(null);
  }

  function handleFile(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile.name);
    }
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="logo-area">
          <div className="logo-icon">✦</div>

          <div>
            <div className="logo-title">
              Enterprise AI
            </div>

            <div className="logo-subtitle">
              Knowledge Assistant
            </div>
          </div>
        </div>

        <button
          className="new-chat-button"
          onClick={startNewChat}
        >
          + New Chat
        </button>

        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search chats..."
          />
        </div>

        <div className="sidebar-title">
          RECENT CHATS
        </div>

        <button className="history-item">
          💬 Leave policy for employees
        </button>

        <button className="history-item">
          💬 Work from home policy
        </button>

        <button className="history-item">
          💬 Expense reimbursement
        </button>

        <button className="history-item">
          💬 IT security guidelines
        </button>

        <div className="sidebar-bottom">

          <button className="sidebar-link">
            📁 Documents
          </button>

          <button className="sidebar-link">
            ⚙ Settings
          </button>

          <div className="profile">
            <div className="profile-avatar">
              SM
            </div>

            <div className="profile-info">
              <strong>Saloni Mehta</strong>
              <span>Employee</span>
            </div>
          </div>

        </div>

      </aside>

      {/* MAIN AREA */}

      <main className="main">

        {/* HEADER */}

        <header className="header">

          <div>
            <h1>AI Assistant</h1>

            <div className="online-status">
              <span className="green-dot"></span>
              Enterprise knowledge is ready
            </div>
          </div>

          <div className="header-actions">

            <button
              className="theme-button"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀" : "☾"}
            </button>

            <button className="help-button">
              ? Help
            </button>

            <div className="header-avatar">
              SM
            </div>

          </div>

        </header>

        {/* CHAT */}

        <section className="chat-container">

          <div className="welcome">

            <div className="ai-icon">
              ✦
            </div>

            <div>
              <h2>
                How can I help you today?
              </h2>

              <p>
                Ask questions about your organization's documents and policies.
              </p>
            </div>

          </div>

          {/* SUGGESTIONS */}

          <div className="suggestions">

            {suggestions.map((suggestion) => (

              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </button>

            ))}

          </div>

          {/* MESSAGES */}

          <div className="messages">

            {messages.map((message) => (

              <div
                key={message.id}
                className={
                  message.type === "user"
                    ? "message user-message"
                    : "message"
                }
              >

                <div
                  className={
                    message.type === "user"
                      ? "message-avatar user-avatar"
                      : "message-avatar ai-avatar"
                  }
                >
                  {message.type === "user" ? "SM" : "✦"}
                </div>

                <div className="message-content">

                  <div className="message-name">

                    {message.type === "user"
                      ? "You"
                      : "Enterprise AI"}

                  </div>

                  <div
                    className={
                      message.type === "user"
                        ? "message-bubble user-bubble"
                        : "message-bubble"
                    }
                  >
                    {message.text}
                  </div>

                  {message.type === "assistant" && (
                    <div className="message-actions">

                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(message.text)
                        }
                      >
                        Copy
                      </button>

                      <button>
                        👍
                      </button>

                      <button>
                        👎
                      </button>

                    </div>
                  )}

                </div>

              </div>

            ))}

            {/* TYPING */}

            {typing && (

              <div className="message">

                <div className="message-avatar ai-avatar">
                  ✦
                </div>

                <div>

                  <div className="message-name">
                    Enterprise AI
                  </div>

                  <div className="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                </div>

              </div>

            )}

          </div>

          {/* FILE */}

          {file && (

            <div className="attached-file">

              📄 {file}

              <button onClick={() => setFile(null)}>
                ×
              </button>

            </div>

          )}

          {/* INPUT */}

          <div className="input-area">

            <input
              type="text"
              value={input}
              placeholder="Ask anything about your company..."
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <label className="attach-button">

              📎

              <input
                type="file"
                hidden
                onChange={handleFile}
              />

            </label>

            <button
              className="send-button"
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
            >
              ↑
            </button>

          </div>

          <div className="disclaimer">
            Enterprise AI can make mistakes. Check important information
            against the original company documents.
          </div>

        </section>

      </main>

    </div>
  );
}
