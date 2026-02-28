import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";

type Section = "chats" | "contacts" | "archive" | "search" | "profile" | "settings";

interface SidebarProps {
  active: Section;
  onNav: (s: Section) => void;
  user: { name: string; email: string };
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
  return (
    <div className="flex flex-col items-center py-4 px-2 h-full"
      style={{ background: "#0d0d1a", width: 68, borderRight: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Logo */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 animate-glow cursor-pointer flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
        onClick={() => onNav("chats")}
      >
        <Icon name="Zap" size={18} className="text-white" />
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
                color: active === id ? "#a78bfa" : "rgba(255,255,255,0.35)",
                transition: "color 0.2s"
              } as React.CSSProperties}
            />
            <span className="text-[9px] font-medium"
              style={{ color: active === id ? "#a78bfa" : "rgba(255,255,255,0.25)" }}>
              {label}
            </span>
          </button>
        ))}
      </nav>

      {/* User avatar at bottom */}
      <div className="mt-2 cursor-pointer" onClick={() => onNav("profile")}>
        <Avatar initials={user.name.slice(0, 2).toUpperCase()} size="sm" seed={1} />
      </div>
    </div>
  );
}
