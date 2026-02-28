import { useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { chats, contacts } from "@/data/mockData";

export default function SearchPanel() {
  const [query, setQuery] = useState("");

  const matchedChats = query.length > 1
    ? chats.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.lastMessage.toLowerCase().includes(query.toLowerCase()))
    : [];

  const matchedContacts = query.length > 1
    ? contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const matchedMessages = query.length > 1
    ? chats.flatMap(chat =>
        chat.messages
          .filter(m => m.text.toLowerCase().includes(query.toLowerCase()))
          .map(m => ({ ...m, chatName: chat.name, chatAvatar: chat.avatar, chatId: chat.id }))
      )
    : [];

  const hasResults = matchedChats.length || matchedContacts.length || matchedMessages.length;

  return (
    <div className="flex flex-col h-full bg-mesh">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <h2 className="text-2xl font-bold text-white mb-6">Глобальный поиск</h2>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(255,255,255,0.3)" } as React.CSSProperties} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Поиск по чатам, контактам, сообщениям..."
            className="msg-input w-full text-sm py-4 pl-12 pr-4 text-base"
            autoFocus
          />
          {query && (
            <button className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setQuery("")}
              style={{ color: "rgba(255,255,255,0.3)" }}>
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {!query && (
          <div className="flex flex-col items-center justify-center h-64 gap-4 animate-fade-in">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.1)" }}>
              <Icon name="Search" size={36} style={{ color: "rgba(124,58,237,0.4)" } as React.CSSProperties} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-white mb-1">Начните вводить запрос</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                Поиск по чатам, контактам и сообщениям
              </p>
            </div>
          </div>
        )}

        {query.length > 1 && !hasResults && (
          <div className="flex flex-col items-center justify-center h-48 gap-3 animate-fade-in">
            <Icon name="SearchX" size={40} style={{ color: "rgba(255,255,255,0.1)" } as React.CSSProperties} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              Ничего не найдено по запросу «{query}»
            </p>
          </div>
        )}

        {matchedChats.length > 0 && (
          <div className="mb-6 animate-fade-in">
            <h3 className="text-xs font-bold mb-3 uppercase tracking-wider"
              style={{ color: "rgba(167,139,250,0.8)" }}>Чаты ({matchedChats.length})</h3>
            <div className="space-y-1">
              {matchedChats.map(chat => (
                <div key={chat.id} className="chat-item flex items-center gap-3 px-4 py-3">
                  <Avatar initials={chat.avatar} size="md" online={chat.online} seed={chat.id} />
                  <div>
                    <p className="font-semibold text-sm text-white">{chat.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{chat.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {matchedContacts.length > 0 && (
          <div className="mb-6 animate-fade-in">
            <h3 className="text-xs font-bold mb-3 uppercase tracking-wider"
              style={{ color: "rgba(6,182,212,0.8)" }}>Контакты ({matchedContacts.length})</h3>
            <div className="space-y-1">
              {matchedContacts.map(c => (
                <div key={c.id} className="chat-item flex items-center gap-3 px-4 py-3">
                  <Avatar initials={c.avatar} size="md" online={c.online} seed={c.id + 3} />
                  <div>
                    <p className="font-semibold text-sm text-white">{c.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{c.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {matchedMessages.length > 0 && (
          <div className="animate-fade-in">
            <h3 className="text-xs font-bold mb-3 uppercase tracking-wider"
              style={{ color: "rgba(236,72,153,0.8)" }}>Сообщения ({matchedMessages.length})</h3>
            <div className="space-y-2">
              {matchedMessages.map((msg) => {
                const text = msg.text;
                const idx = text.toLowerCase().indexOf(query.toLowerCase());
                return (
                  <div key={msg.id} className="glass rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar initials={msg.chatAvatar} size="sm" seed={msg.chatId} />
                      <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {msg.chatName}
                      </span>
                      <span className="text-xs ml-auto" style={{ color: "rgba(255,255,255,0.25)" }}>{msg.time}</span>
                    </div>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {text.slice(0, idx)}
                      <mark style={{ background: "rgba(124,58,237,0.4)", color: "white", borderRadius: 3, padding: "0 2px" }}>
                        {text.slice(idx, idx + query.length)}
                      </mark>
                      {text.slice(idx + query.length)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
