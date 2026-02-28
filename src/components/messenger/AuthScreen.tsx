import { useState } from "react";
import Icon from "@/components/ui/icon";
import { usersStore, StoredUser } from "@/data/mockData";

interface AuthScreenProps {
  onAuth: (user: { name: string; email: string; nick: string }) => void;
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (step === 1) { setStep(2); return; }
      const exists = usersStore.find(u => u.nick.toLowerCase() === nick.toLowerCase() || u.email.toLowerCase() === email.toLowerCase());
      if (exists) { setError("Пользователь с таким ником или email уже существует"); return; }
      const newUser: StoredUser = { nick, email, password, registeredAt: new Date().toISOString().slice(0, 10) };
      usersStore.push(newUser);
      onAuth({ name: nick, email, nick });
    } else {
      const found = usersStore.find(u =>
        (u.email.toLowerCase() === email.toLowerCase() || u.nick.toLowerCase() === email.toLowerCase()) &&
        u.password === password
      );
      if (!found) { setError("Неверный логин или пароль"); return; }
      if (found.banned) { setError(`Вы заблокированы. Причина: ${found.banReason || "нарушение правил"}`); return; }
      onAuth({ name: found.nick, email: found.email, nick: found.nick });
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float"
        style={{ background: "radial-gradient(circle, #b91c1c, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)", animationDelay: "1s" }} />

      <div className="w-full max-w-md animate-scale-in relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-4 animate-glow"
            style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)", boxShadow: "0 0 40px rgba(239,68,68,0.5)" }}>
            <span style={{ fontSize: 48, fontWeight: 900, color: "white", lineHeight: 1, fontFamily: "Georgia, serif", letterSpacing: "-2px" }}>F</span>
          </div>
          <h1 className="text-4xl font-black gradient-text mb-2">FOLOZOGER</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Мессенджер для игроков FOLOZOW MTA
          </p>
        </div>

        <div className="glass rounded-3xl p-8">
          <div className="flex gap-1 p-1 rounded-2xl mb-8" style={{ background: "rgba(255,255,255,0.05)" }}>
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setStep(1); setError(""); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: mode === m ? "linear-gradient(135deg, #b91c1c, #ef4444)" : "transparent",
                  color: mode === m ? "white" : "rgba(255,255,255,0.4)"
                }}
              >
                {m === "login" ? "Войти" : "Регистрация"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && step === 1 && (
              <div className="animate-fade-in">
                <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Никнейм (как в игре)
                </label>
                <div className="relative">
                  <Icon name="Gamepad2" size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "rgba(255,255,255,0.3)" } as React.CSSProperties} />
                  <input
                    type="text"
                    value={nick}
                    onChange={e => setNick(e.target.value)}
                    placeholder="Ваш ник в FOLOZOW MTA"
                    className="msg-input w-full py-3 pl-11 pr-4 text-sm"
                    required
                  />
                </div>
              </div>
            )}

            {(mode === "login" || step === 2) && (
              <div className="animate-fade-in">
                <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {mode === "login" ? "Email или никнейм" : "Email"}
                </label>
                <div className="relative">
                  <Icon name="Mail" size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "rgba(255,255,255,0.3)" } as React.CSSProperties} />
                  <input
                    type={mode === "register" ? "email" : "text"}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={mode === "login" ? "email или ник" : "your@email.com"}
                    className="msg-input w-full py-3 pl-11 pr-4 text-sm"
                    required
                  />
                </div>
              </div>
            )}

            {(mode === "login" || step === 2) && (
              <div className="animate-fade-in">
                <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Пароль
                </label>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "rgba(255,255,255,0.3)" } as React.CSSProperties} />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="msg-input w-full py-3 pl-11 pr-4 text-sm"
                    required
                  />
                </div>
              </div>
            )}

            {mode === "register" && step === 1 && (
              <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                Шаг 1 из 2 — придумайте никнейм
              </p>
            )}

            {error && (
              <p className="text-xs text-center py-2 px-3 rounded-xl animate-fade-in"
                style={{ color: "#fca5a5", background: "rgba(239,68,68,0.1)" }}>
                {error}
              </p>
            )}

            <button type="submit"
              className="w-full py-3.5 rounded-2xl font-semibold text-sm mt-2 text-white transition-all"
              style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)" }}>
              {mode === "login" ? "Войти в аккаунт" : step === 1 ? "Продолжить →" : "Создать аккаунт"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
          FOLOZOGER · Защищённое соединение 🔒
        </p>
      </div>
    </div>
  );
}
