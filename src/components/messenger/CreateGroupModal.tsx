import { useState } from "react";
import Icon from "@/components/ui/icon";
import { usersStore, Chat } from "@/data/mockData";

interface CreateGroupModalProps {
  currentNick: string;
  onClose: () => void;
  onCreate: (group: Chat) => void;
}

export default function CreateGroupModal({ currentNick, onClose, onCreate }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const availableUsers = usersStore.filter(u => u.nick !== currentNick);

  const toggle = (nick: string) => {
    setSelected(prev => prev.includes(nick) ? prev.filter(n => n !== nick) : [...prev, nick]);
  };

  const handleCreate = () => {
    if (!groupName.trim()) return;
    const members = [currentNick, ...selected];
    const newGroup: Chat = {
      id: Date.now(),
      name: groupName.trim(),
      avatar: groupName.slice(0, 2).toUpperCase(),
      lastMessage: "Группа создана",
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      unread: 0,
      online: false,
      isGroup: true,
      members,
      messages: [
        {
          id: 1,
          text: `Группа "${groupName.trim()}" создана. Участников: ${members.length}`,
          time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
          out: false,
          authorNick: "Система",
        }
      ]
    };
    onCreate(newGroup);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="glass rounded-3xl p-6 w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Новая группа</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Group name */}
        <div className="mb-4">
          <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
            Название группы
          </label>
          <div className="relative">
            <Icon name="Users" size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(255,255,255,0.3)" } as React.CSSProperties} />
            <input
              type="text"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              placeholder="Введите название..."
              className="msg-input w-full py-3 pl-11 pr-4 text-sm"
              autoFocus
            />
          </div>
        </div>

        {/* Members */}
        <div className="mb-5">
          <label className="block text-xs font-medium mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
            Добавить участников
          </label>
          {availableUsers.length === 0 ? (
            <p className="text-sm text-center py-6" style={{ color: "rgba(255,255,255,0.25)" }}>
              Нет других пользователей
            </p>
          ) : (
            <div className="space-y-1 max-h-52 overflow-y-auto">
              {availableUsers.map(u => {
                const isSelected = selected.includes(u.nick);
                return (
                  <div
                    key={u.nick}
                    onClick={() => toggle(u.nick)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                    style={{ background: isSelected ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.04)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: isSelected ? "linear-gradient(135deg, #b91c1c, #ef4444)" : "rgba(255,255,255,0.1)" }}>
                      {u.nick.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{u.nick}</p>
                      <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{u.email}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        borderColor: isSelected ? "#ef4444" : "rgba(255,255,255,0.2)",
                        background: isSelected ? "#ef4444" : "transparent"
                      }}>
                      {isSelected && <Icon name="Check" size={10} className="text-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {selected.length > 0 && (
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            Выбрано: {selected.join(", ")} + вы
          </p>
        )}

        <button
          onClick={handleCreate}
          disabled={!groupName.trim()}
          className="w-full py-3 rounded-2xl font-semibold text-sm text-white transition-all"
          style={{
            background: groupName.trim() ? "linear-gradient(135deg, #b91c1c, #ef4444)" : "rgba(255,255,255,0.07)",
            color: groupName.trim() ? "white" : "rgba(255,255,255,0.25)"
          }}>
          Создать группу
        </button>
      </div>
    </div>
  );
}
