import { useState } from "react";
import Icon from "@/components/ui/icon";
import { usersStore, StoredUser } from "@/data/mockData";

type Tab = "users" | "bans";

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>("users");
  const [, forceUpdate] = useState(0);
  const [selectedUser, setSelectedUser] = useState<StoredUser | null>(null);
  const [banReason, setBanReason] = useState("");
  const [muteHours, setMuteHours] = useState("1");
  const [action, setAction] = useState<"ban" | "mute" | "view" | null>(null);
  const [showPass, setShowPass] = useState<Record<string, boolean>>({});

  const refresh = () => forceUpdate(n => n + 1);

  const openAction = (u: StoredUser, a: "ban" | "mute" | "view") => {
    setSelectedUser(u);
    setAction(a);
    setBanReason("");
    setMuteHours("1");
  };

  const doBan = () => {
    if (!selectedUser) return;
    selectedUser.banned = true;
    selectedUser.banReason = banReason || "нарушение правил";
    setAction(null);
    refresh();
  };

  const doUnban = (u: StoredUser) => {
    u.banned = false;
    u.banReason = undefined;
    refresh();
  };

  const doMute = () => {
    if (!selectedUser) return;
    const until = new Date(Date.now() + Number(muteHours) * 3600000);
    selectedUser.muted = true;
    selectedUser.muteUntil = until.toLocaleString("ru");
    setAction(null);
    refresh();
  };

  const doUnmute = (u: StoredUser) => {
    u.muted = false;
    u.muteUntil = undefined;
    refresh();
  };

  const activeUsers = usersStore.filter(u => !u.banned);
  const bannedUsers = usersStore.filter(u => u.banned);

  const displayList = tab === "bans" ? bannedUsers : activeUsers;

  return (
    <div className="flex flex-col h-full" style={{ background: "#0a0a18" }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4 glass border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)" }}>
            <Icon name="Shield" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Панель управления</h1>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Только для администратора</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Всего игроков", value: usersStore.length, icon: "Users" },
            { label: "Заблокированных", value: bannedUsers.length, icon: "UserX" },
            { label: "Активных", value: activeUsers.length, icon: "UserCheck" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-3 text-center"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              <Icon name={s.icon as "Users"} size={18} className="mx-auto mb-1" style={{ color: "#ef4444" } as React.CSSProperties} />
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)" }}>
          {([
            { id: "users", label: "Игроки", icon: "Users" },
            { id: "bans", label: "Баны", icon: "UserX" },
          ] as { id: Tab; label: string; icon: string }[]).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex-1 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
              style={{
                background: tab === t.id ? "linear-gradient(135deg, #b91c1c, #ef4444)" : "transparent",
                color: tab === t.id ? "white" : "rgba(255,255,255,0.4)"
              }}>
              <Icon name={t.icon as "Users"} size={14} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {displayList.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 gap-3">
            <Icon name="UserCheck" size={36} style={{ color: "rgba(255,255,255,0.1)" } as React.CSSProperties} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
              {tab === "bans" ? "Нет заблокированных" : "Нет игроков"}
            </p>
          </div>
        )}

        {displayList.map(u => (
          <div key={u.nick} className="rounded-2xl p-4 animate-fade-in"
            style={{ background: u.banned ? "rgba(239,68,68,0.07)" : "rgba(255,255,255,0.04)", border: u.banned ? "1px solid rgba(239,68,68,0.15)" : "1px solid transparent" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: u.nick === "CoNNectioN" ? "linear-gradient(135deg, #b91c1c, #ef4444)" : "rgba(255,255,255,0.1)" }}>
                {u.nick.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-white truncate">{u.nick}</p>
                  {u.nick === "CoNNectioN" && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>ADMIN</span>
                  )}
                  {u.banned && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>БАН</span>
                  )}
                  {u.muted && !u.banned && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24" }}>МУТ</span>
                  )}
                </div>
                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{u.email}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Пароль: {showPass[u.nick] ? u.password : "••••••"}
                  </span>
                  <button onClick={() => setShowPass(p => ({ ...p, [u.nick]: !p[u.nick] }))}
                    className="p-0.5 rounded hover:bg-white/10 transition-all"
                    style={{ color: "rgba(255,255,255,0.25)" }}>
                    <Icon name={showPass[u.nick] ? "EyeOff" : "Eye"} size={11} />
                  </button>
                </div>
                {u.banned && u.banReason && (
                  <p className="text-xs mt-0.5" style={{ color: "rgba(239,68,68,0.6)" }}>Причина: {u.banReason}</p>
                )}
                {u.muted && u.muteUntil && (
                  <p className="text-xs mt-0.5" style={{ color: "rgba(251,191,36,0.6)" }}>Мут до: {u.muteUntil}</p>
                )}
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>
                  Зарегистрирован: {u.registeredAt}
                </p>
              </div>
            </div>

            {u.nick !== "CoNNectioN" && (
              <div className="flex gap-2 mt-3">
                <button onClick={() => openAction(u, "view")}
                  className="flex-1 py-1.5 rounded-xl text-xs font-medium transition-all hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                  <Icon name="Eye" size={12} className="inline mr-1" />
                  Просмотр
                </button>
                {u.banned ? (
                  <button onClick={() => doUnban(u)}
                    className="flex-1 py-1.5 rounded-xl text-xs font-medium transition-all"
                    style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                    <Icon name="UserCheck" size={12} className="inline mr-1" />
                    Разбанить
                  </button>
                ) : (
                  <button onClick={() => openAction(u, "ban")}
                    className="flex-1 py-1.5 rounded-xl text-xs font-medium transition-all"
                    style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
                    <Icon name="UserX" size={12} className="inline mr-1" />
                    Бан
                  </button>
                )}
                {u.muted ? (
                  <button onClick={() => doUnmute(u)}
                    className="flex-1 py-1.5 rounded-xl text-xs font-medium transition-all"
                    style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
                    <Icon name="VolumeX" size={12} className="inline mr-1" />
                    Размутить
                  </button>
                ) : (
                  <button onClick={() => openAction(u, "mute")}
                    className="flex-1 py-1.5 rounded-xl text-xs font-medium transition-all"
                    style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24" }}>
                    <Icon name="VolumeX" size={12} className="inline mr-1" />
                    Мут
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Modal */}
      {action && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={e => { if (e.target === e.currentTarget) setAction(null); }}>
          <div className="glass rounded-3xl p-6 w-full max-w-sm animate-scale-in">
            {action === "view" && (
              <>
                <h3 className="text-base font-bold text-white mb-4">Профиль: {selectedUser.nick}</h3>
                <div className="space-y-3">
                  {[
                    { label: "Никнейм", value: selectedUser.nick },
                    { label: "Email", value: selectedUser.email },
                    { label: "Пароль", value: selectedUser.password },
                    { label: "Дата регистрации", value: selectedUser.registeredAt },
                    { label: "Статус", value: selectedUser.banned ? "Заблокирован" : selectedUser.muted ? "Замьючен" : "Активен" },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{row.label}</span>
                      <span className="text-sm font-medium text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setAction(null)}
                  className="w-full mt-4 py-3 rounded-2xl font-semibold text-sm text-white"
                  style={{ background: "rgba(255,255,255,0.08)" }}>
                  Закрыть
                </button>
              </>
            )}

            {action === "ban" && (
              <>
                <h3 className="text-base font-bold text-white mb-1">Заблокировать игрока</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{selectedUser.nick}</p>
                <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Причина бана
                </label>
                <input
                  type="text"
                  value={banReason}
                  onChange={e => setBanReason(e.target.value)}
                  placeholder="Читерство, оскорбления..."
                  className="msg-input w-full py-3 px-4 text-sm mb-4"
                />
                <div className="flex gap-2">
                  <button onClick={() => setAction(null)}
                    className="flex-1 py-3 rounded-2xl text-sm font-semibold"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                    Отмена
                  </button>
                  <button onClick={doBan}
                    className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)" }}>
                    Заблокировать
                  </button>
                </div>
              </>
            )}

            {action === "mute" && (
              <>
                <h3 className="text-base font-bold text-white mb-1">Замьютить игрока</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{selectedUser.nick}</p>
                <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Продолжительность (часов)
                </label>
                <input
                  type="number"
                  min="1"
                  max="720"
                  value={muteHours}
                  onChange={e => setMuteHours(e.target.value)}
                  className="msg-input w-full py-3 px-4 text-sm mb-4"
                />
                <div className="flex gap-2">
                  <button onClick={() => setAction(null)}
                    className="flex-1 py-3 rounded-2xl text-sm font-semibold"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                    Отмена
                  </button>
                  <button onClick={doMute}
                    className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #92400e, #d97706)" }}>
                    Замьютить
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
