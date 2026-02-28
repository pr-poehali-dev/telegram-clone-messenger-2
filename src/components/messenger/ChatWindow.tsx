import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { Chat, Message, ADMIN_NICK } from "@/data/mockData";

interface ChatWindowProps {
  chat: Chat;
  user: { name: string; email: string; nick: string };
}

export default function ChatWindow({ chat, user }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const EMOJIS = ["😊", "👍", "❤️", "😂", "🔥", "✅", "🎉", "👋", "💪", "🙏"];

  const isChannel = !!chat.isChannel;
  const canWrite = !isChannel || user.nick === ADMIN_NICK;

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text || !canWrite) return;
    const msg: Message = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      out: true,
      read: false,
      authorNick: user.nick,
    };
    setMessages(prev => [...prev, msg]);
    chat.messages.push(msg);
    chat.lastMessage = text;
    setInput("");
    inputRef.current?.focus();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="flex flex-col h-full bg-mesh">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 glass border-b border-white/5">
        {isChannel ? (
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)" }}>
            <Icon name="Megaphone" size={18} className="text-white" />
          </div>
        ) : (
          <Avatar initials={chat.avatar} size="md" online={chat.online} seed={chat.id} />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-white text-sm">{chat.name}</h3>
          {isChannel ? (
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Официальный канал FOLOZOW MTA
            </p>
          ) : chat.isGroup ? (
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Группа · {chat.members?.length ?? 0} участников
            </p>
          ) : (
            <p className="text-xs" style={{ color: chat.online ? "#22c55e" : "rgba(255,255,255,0.35)" }}>
              {chat.online ? "онлайн" : "был(а) недавно"}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            <Icon name="MoreVertical" size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {isChannel && (
          <div className="flex justify-center mb-4">
            <div className="px-4 py-2 rounded-2xl text-xs"
              style={{ background: "rgba(239,68,68,0.1)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(239,68,68,0.2)" }}>
              📢 Только администратор может отправлять сообщения в этот канал
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex animate-msg ${msg.out ? "justify-end" : "justify-start"}`}
            style={{ animationDelay: `${Math.min(i * 0.03, 0.3)}s` }}
          >
            {!msg.out && (
              <div className="mr-2 mt-1 flex-shrink-0">
                {isChannel || chat.isGroup ? (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)" }}>
                    {(msg.authorNick ?? "?").slice(0, 2).toUpperCase()}
                  </div>
                ) : (
                  <Avatar initials={chat.avatar} size="sm" seed={chat.id} />
                )}
              </div>
            )}
            <div className="max-w-[68%]">
              {(!msg.out && (isChannel || chat.isGroup)) && (
                <p className="text-[10px] font-semibold mb-1 px-1" style={{ color: "#ef4444" }}>
                  {msg.authorNick}
                </p>
              )}
              <div
                className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: msg.out
                    ? "linear-gradient(135deg, #b91c1c, #dc2626)"
                    : "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.95)",
                  borderRadius: msg.out ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                }}
              >
                {msg.text}
              </div>
              <div className={`flex items-center gap-1 mt-1 ${msg.out ? "justify-end" : "justify-start"}`}>
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {msg.time}
                </span>
                {msg.out && (
                  <Icon
                    name={msg.read ? "CheckCheck" : "Check"}
                    size={12}
                    style={{ color: msg.read ? "#fca5a5" : "rgba(255,255,255,0.3)" } as React.CSSProperties}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      {canWrite ? (
        <div className="px-4 py-3 glass border-t border-white/5">
          {showEmoji && (
            <div className="mb-3 p-3 rounded-2xl flex gap-2 flex-wrap animate-fade-in"
              style={{ background: "rgba(255,255,255,0.07)" }}>
              {EMOJIS.map(e => (
                <button key={e} className="text-xl hover:scale-125 transition-transform"
                  onClick={() => { setInput(prev => prev + e); setShowEmoji(false); }}>
                  {e}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:bg-white/10"
              style={{ color: showEmoji ? "#ef4444" : "rgba(255,255,255,0.4)" }}
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <Icon name="Smile" size={20} />
            </button>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={isChannel ? "Написать в канал..." : "Написать сообщение..."}
              className="msg-input flex-1 py-3 px-4 text-sm"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                background: input.trim() ? "linear-gradient(135deg, #b91c1c, #ef4444)" : "rgba(255,255,255,0.07)",
                color: input.trim() ? "white" : "rgba(255,255,255,0.25)"
              }}
            >
              <Icon name="Send" size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-4 glass border-t border-white/5 flex items-center justify-center gap-2"
          style={{ color: "rgba(255,255,255,0.3)" }}>
          <Icon name="Lock" size={16} style={{ color: "rgba(239,68,68,0.5)" } as React.CSSProperties} />
          <span className="text-sm">Только администратор может писать в этот канал</span>
        </div>
      )}
    </div>
  );
}
