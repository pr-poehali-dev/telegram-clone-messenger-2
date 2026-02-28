import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { ADMIN_NICK } from "@/data/mockData";

type Section = "chats" | "contacts" | "archive" | "search" | "profile" | "settings" | "admin";

interface SidebarProps {
  active: Section;
  onNav: (s: Section) => void;
  user: { name: string; email: string; nick: string };
}

const NAV = [
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "archive", icon: "Archive", label: "Архив" },
  { id: "search", icon: "Search", label: "Поиск" },
  { id: "profile", icon: "User", label: "Профиль" },
  { id: "settings", icon: "Settings", label: "Настройки" },
] as const;

export default function Sidebar({ active, onNav, user }: SidebarProps) {
  const isAdmin = user.nick === ADMIN_NICK;

  return (
    <div className="flex flex-col items-center py-4 px-2 h-full"
      style={{ background: "#0d0d1a", width: 68, borderRight: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Logo */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 animate-glow cursor-pointer flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)", boxShadow: "0 0 20px rgba(239,68,68,0.3)" }}
        onClick={() => onNav("chats")}
      >
        <span style={{ fontSize: 22, fontWeight: 900, color: "white", lineHeight: 1, fontFamily: "Georgia, serif" }}>F</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => onNav(id as Section)}
            className={`nav-item w-12 h-12 flex flex-col items-center justify-center gap-0.5 ${active === id ? "active" : ""}`}
            title={label}
          >
            <Icon
              name={icon}
              size={20}
              style={{
                color: active === id ? "#ef4444" : "rgba(255,255,255,0.35)",
                transition: "color 0.2s"
              } as React.CSSProperties}
            />
            <span className="text-[9px] font-medium"
              style={{ color: active === id ? "#ef4444" : "rgba(255,255,255,0.25)" }}>
              {label}
            </span>
          </button>
        ))}

        {/* Admin button */}
        {isAdmin && (
          <button
            onClick={() => onNav("admin")}
            className={`nav-item w-12 h-12 flex flex-col items-center justify-center gap-0.5 ${active === "admin" ? "active" : ""}`}
            title="Панель управления"
          >
            <Icon
              name="Shield"
              size={20}
              style={{
                color: active === "admin" ? "#ef4444" : "rgba(239,68,68,0.5)",
                transition: "color 0.2s"
              } as React.CSSProperties}
            />
            <span className="text-[9px] font-medium"
              style={{ color: active === "admin" ? "#ef4444" : "rgba(239,68,68,0.4)" }}>
              Admin
            </span>
          </button>
        )}
      </nav>

      {/* User avatar at bottom */}
      <div className="mt-2 cursor-pointer" onClick={() => onNav("profile")}>
        <Avatar initials={user.nick.slice(0, 2).toUpperCase()} size="sm" seed={1} />
      </div>
    </div>
  );
}
