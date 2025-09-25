import React, { useState } from "react";

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hi! Ask me anything about AdaptiveLearn." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { from: "user", text: input };
        setMessages((msgs) => [...msgs, userMsg]);
        setLoading(true);

        try {
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateMessage",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer YOUR_API_KEY_HERE`, // Do not expose in frontend for production
                    },
                    body: JSON.stringify({
                        prompt: {
                            messages: [
                                { author: "system", content: "You are a helpful AdaptiveLearn course assistant." },
                                ...messages.map((m) => ({
                                    author: m.from === "bot" ? "assistant" : "user",
                                    content: m.text,
                                })),
                                { author: "user", content: input },
                            ],
                        },
                        temperature: 0.7,
                        candidateCount: 1,
                        topP: 0.8,
                        topK: 40,
                    }),
                }
            );

            const data = await response.json();
            const botReply = data.candidates?.[0]?.content || "Sorry, I could not generate a response.";

            setMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
        } catch (error) {
            setMessages((msgs) => [...msgs, { from: "bot", text: "Error contacting AI service." }]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    return (
        <>
            {/* Chatbot toggle button */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 rounded-full p-4 shadow-lg text-white text-xl font-bold"
                aria-label="Toggle chatbot"
            >
                💬
            </button>

            {/* Chatbot window */}
            {open && (
                <div className="fixed bottom-24 right-6 w-96 h-96 bg-[#23253c] shadow-xl rounded-2xl p-4 z-50 flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-cyan-400 font-semibold">AdaptiveLearn Chatbot</h3>
                        <button className="text-white text-xl" onClick={() => setOpen(false)}>
                            ×
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto mb-3 bg-[#1d1f33] p-3 rounded">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`mb-2 px-3 py-1 rounded max-w-[80%] ${
                                    msg.from === "bot"
                                        ? "bg-cyan-700 text-white self-start"
                                        : "bg-yellow-500 text-black self-end"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div className="text-gray-400 italic">Thinking...</div>}
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 rounded px-3 py-2 text-black"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            disabled={loading}
                        />
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded font-semibold"
                            onClick={sendMessage}
                            disabled={loading}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
