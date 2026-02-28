import { useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";

interface ProfilePanelProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

export default function ProfilePanel({ user, onLogout }: ProfilePanelProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState("Разработчик и энтузиаст 🚀");
  const [phone, setPhone] = useState("+7 916 000-00-00");

  return (
    <div className="flex flex-col h-full bg-mesh overflow-y-auto">
      {/* Hero */}
      <div className="relative px-8 pt-12 pb-8 text-center"
        style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.15) 0%, transparent 100%)" }}>
        <div className="flex justify-center mb-4 relative inline-flex">
          <Avatar initials={name.slice(0, 2).toUpperCase()} size="xl" online={true} seed={1} />
          <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
            <Icon name="Camera" size={14} className="text-white" />
          </button>
        </div>
        <h2 className="text-2xl font-black text-white mb-1">{name}</h2>
        <p className="text-sm" style={{ color: "rgba(167,139,250,0.8)" }}>@{name.toLowerCase().replace(" ", "")}</p>
        <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>{bio}</p>
      </div>

      <div className="px-6 pb-8 space-y-4">
        {/* Info card */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(167,139,250,0.8)" }}>
              Информация
            </span>
            <button onClick={() => setEditing(!editing)}
              className="text-xs px-3 py-1 rounded-lg transition-all"
              style={{ background: editing ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.07)", color: editing ? "#a78bfa" : "rgba(255,255,255,0.5)" }}>
              {editing ? "Сохранить" : "Изменить"}
            </button>
          </div>

          {[
            { icon: "User", label: "Имя", value: name, setter: setName },
            { icon: "FileText", label: "О себе", value: bio, setter: setBio },
            { icon: "Phone", label: "Телефон", value: phone, setter: setPhone },
            { icon: "Mail", label: "Email", value: user.email, setter: () => {} },
          ].map(({ icon, label, value, setter }, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(124,58,237,0.15)" }}>
                <Icon name={icon} size={15} style={{ color: "#a78bfa" } as React.CSSProperties} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</p>
                {editing && label !== "Email" ? (
                  <input
                    value={value}
                    onChange={e => setter(e.target.value)}
                    className="msg-input w-full text-sm py-1 px-2 rounded-lg"
                  />
                ) : (
                  <p className="text-sm text-white truncate">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Чаты", value: "5", icon: "MessageCircle" },
            { label: "Контакты", value: "7", icon: "Users" },
            { label: "Медиа", value: "24", icon: "Image" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="glass rounded-2xl p-4 text-center">
              <Icon name={icon} size={20} className="mx-auto mb-2" style={{ color: "#a78bfa" } as React.CSSProperties} />
              <p className="text-xl font-black text-white">{value}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all"
          style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <Icon name="LogOut" size={16} />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
