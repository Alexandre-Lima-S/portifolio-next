"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

const GoboPet = dynamic(() => import("@/components/GoboPet"), { ssr: false });

type Message = { from: "user" | "bot"; text: string };

export default function GoboClient() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Olá! Como posso ajudar você hoje?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Desculpe, ainda estou em desenvolvimento." },
      ]);
    }, 500);
  };

  return (
    <>
      <Suspense fallback={null}>
        <GoboPet onClick={() => setShowChat(true)} />
      </Suspense>

      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col">
            <div className="p-2 border-b flex justify-between items-center">
              <span className="font-bold">Assistente Virtual</span>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 p-2 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    msg.from === "user"
                      ? "text-right mt-2 text-sm"
                      : "text-left mt-2 text-sm"
                  }
                >
                  <span
                    className={
                      msg.from === "user"
                        ? "inline-block bg-blue-100 px-2 py-1 rounded"
                        : "inline-block bg-gray-100 px-2 py-1 rounded"
                    }
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-2 border-t flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 border rounded px-2 py-1 text-sm"
              />
              <button
                onClick={sendMessage}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
