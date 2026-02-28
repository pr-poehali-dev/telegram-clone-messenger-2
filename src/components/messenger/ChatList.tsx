import { useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { chats, Chat } from "@/data/mockData";

interface ChatListProps {
  onSelect: (chat: Chat) => void;
  selectedId?: number;
  archived?: boolean;
}

export default function ChatList({ onSelect, selectedId, archived = false }: ChatListProps) {
  const [search, setSearch] = useState("");

  const filtered = chats.filter(c =>
    (archived ? c.archived : !c.archived) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">{archived ? "Архив" : "Чаты"}</h2>
          {!archived && (
            <button className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              <Icon name="Plus" size={18} />
            </button>
          )}
        </div>
        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(255,255,255,0.3)" } as React.CSSProperties} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="msg-input w-full text-sm py-2.5 pl-9 pr-4"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 gap-3">
            <Icon name="MessageCircleOff" size={32} style={{ color: "rgba(255,255,255,0.1)" } as React.CSSProperties} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>Ничего не найдено</p>
          </div>
        )}
        {filtered.map((chat, i) => (
          <div
            key={chat.id}
            className={`chat-item flex items-center gap-3 px-3 py-3 ${selectedId === chat.id ? "active" : ""}`}
            onClick={() => onSelect(chat)}
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <Avatar initials={chat.avatar} size="md" online={chat.online} seed={chat.id} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-sm text-white truncate">{chat.name}</span>
                <span className="text-xs flex-shrink-0 ml-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {chat.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {chat.lastMessage}
                </span>
                {chat.unread > 0 && (
                  <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
