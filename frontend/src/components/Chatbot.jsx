import { useState, useRef, useEffect } from "react";

// ── n8n webhook ──────────────────────────────────────────────
// Replace this URL with your n8n webhook endpoint when ready.
const N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/your-id";
// ─────────────────────────────────────────────────────────────

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const WELCOME_MESSAGE = {
  id: 0,
  role: "bot",
  text: "Welcome to Backstage Supply Co. How can I help you find what your band needs tonight?",
  time: formatTime(new Date()),
};

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const idRef = useRef(1);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing, open]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = {
      id: idRef.current++,
      role: "user",
      text,
      time: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      // n8n typically returns { output: "..." } or { message: "..." }
      const reply =
        data?.output ||
        data?.message ||
        data?.text ||
        "Got it — I'll look into that for you.";

      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          role: "bot",
          text: reply,
          time: formatTime(new Date()),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          role: "bot",
          text: "Something went wrong on my end. Try again in a moment.",
          time: formatTime(new Date()),
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter, new line on Shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="bsc-chat-window"
          role="dialog"
          aria-modal="true"
          aria-label="Backstage Supply Co. chat assistant"
        >
          {/* Header */}
          <div className="bsc-chat-header">
            <div className="bsc-chat-header-left">
              <span className="bsc-chat-flame-icon" aria-hidden="true">
                🔥
              </span>
              <div>
                <p className="bsc-chat-title">Backstage Assistant</p>
                <p className="bsc-chat-status">● Online</p>
              </div>
            </div>
            <button
              className="bsc-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            className="bsc-chat-messages"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`bsc-chat-msg bsc-chat-msg--${msg.role}`}
              >
                <div className="bsc-chat-bubble">{msg.text}</div>
                <span className="bsc-chat-timestamp" aria-hidden="true">
                  {msg.time}
                </span>
              </div>
            ))}

            {typing && (
              <div className="bsc-chat-msg bsc-chat-msg--bot">
                <div className="bsc-chat-typing" aria-label="Assistant is typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bsc-chat-input-area">
            <textarea
              ref={inputRef}
              className="bsc-chat-input"
              placeholder="Ask about gear, orders, or anything rock…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              aria-label="Chat message input"
              disabled={typing}
            />
            <button
              className="bsc-chat-send"
              onClick={sendMessage}
              disabled={!input.trim() || typing}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        className="bsc-chat-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        aria-expanded={open}
      >
        {open ? "✕" : "🎸"}
      </button>
    </>
  );
}

export default Chatbot;
