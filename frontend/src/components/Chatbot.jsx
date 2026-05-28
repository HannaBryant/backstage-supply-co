import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

function Chatbot() {
  useEffect(() => {
    createChat({
      webhookUrl: "https://automations.pathway4.click/webhook/33c41c33-9728-4898-8a15-fbfbb2e239e1/chat",
      mode: "window",
      showWelcomeScreen: false,
      defaultLanguage: "en",
      initialMessages: [
        "Welcome to Backstage Supply Co. 🎸 How can I help you find what your band needs tonight?",
      ],
      i18n: {
        en: {
          title: "Backstage Assistant",
          subtitle: "",
          inputPlaceholder: "Ask about gear, orders, or anything rock…",
          getStarted: "New Conversation",
          closeButtonTooltip: "Close chat",
        },
      },
    });
  }, []);

  return null;
}

export default Chatbot;
