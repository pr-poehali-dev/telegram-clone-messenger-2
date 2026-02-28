import { useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { contacts } from "@/data/mockData";

export default function ContactsPanel() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const grouped = filtered.reduce((acc, contact) => {
    const letter = contact.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(contact);
    return acc;
  }, {} as Record<string, typeof contacts>);

  const selectedContact = contacts.find(c => c.id === selected);

  return (
    <div className="flex h-full">
      {/* Contact list */}
      <div className="flex flex-col h-full" style={{ width: 300, borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Контакты</h2>
            <button className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              <Icon name="UserPlus" size={18} />
            </button>
          </div>
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(255,255,255,0.3)" } as React.CSSProperties} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск контактов..."
              className="msg-input w-full text-sm py-2.5 pl-9 pr-4"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {Object.entries(grouped).sort().map(([letter, group]) => (
            <div key={letter}>
              <div className="px-3 py-1.5">
                <span className="text-xs font-bold" style={{ color: "rgba(124,58,237,0.8)" }}>{letter}</span>
              </div>
              {group.map(contact => (
                <div
                  key={contact.id}
                  className={`chat-item flex items-center gap-3 px-3 py-3 ${selected === contact.id ? "active" : ""}`}
                  onClick={() => setSelected(contact.id)}
                >
                  <Avatar initials={contact.avatar} size="md" online={contact.online} seed={contact.id + 3} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{contact.name}</p>
                    <p className="text-xs truncate" style={{ color: contact.online ? "#22c55e" : "rgba(255,255,255,0.35)" }}>
                      {contact.online ? "онлайн" : contact.lastSeen || "не в сети"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Contact detail */}
      <div className="flex-1 flex items-center justify-center bg-mesh">
        {!selectedContact ? (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(124,58,237,0.1)" }}>
              <Icon name="Users" size={36} style={{ color: "rgba(124,58,237,0.5)" } as React.CSSProperties} />
            </div>
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
              Выберите контакт
            </p>
          </div>
        ) : (
          <div className="text-center animate-scale-in p-8 max-w-sm w-full">
            <div className="flex justify-center mb-6">
              <Avatar initials={selectedContact.avatar} size="xl" online={selectedContact.online} seed={selectedContact.id + 3} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{selectedContact.name}</h2>
            <p className="text-sm mb-6" style={{ color: selectedContact.online ? "#22c55e" : "rgba(255,255,255,0.4)" }}>
              {selectedContact.online ? "онлайн" : selectedContact.lastSeen || "не в сети"}
            </p>

            <div className="glass rounded-2xl p-4 mb-6 text-left">
              <div className="flex items-center gap-3">
                <Icon name="Phone" size={16} style={{ color: "#a78bfa" } as React.CSSProperties} />
                <span className="text-sm text-white">{selectedContact.phone}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button className="btn-gradient flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold">
                <Icon name="MessageCircle" size={16} />
                Написать
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)" }}>
                <Icon name="Phone" size={16} />
                Позвонить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
