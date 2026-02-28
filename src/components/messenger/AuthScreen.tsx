import { useState } from "react";
import Icon from "@/components/ui/icon";

interface AuthScreenProps {
  onAuth: (user: { name: string; email: string }) => void;
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register" && step === 1) {
      setStep(2);
      return;
    }
    onAuth({ name: name || "Пользователь", email });
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)", animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />

      <div className="w-full max-w-md animate-scale-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-4 animate-glow"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
            <Icon name="Zap" size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-black gradient-text mb-2">Pulse</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Мессенджер нового поколения
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8">
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-2xl mb-8" style={{ background: "rgba(255,255,255,0.05)" }}>
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setStep(1); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: mode === m ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "transparent",
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
                  Ваше имя
                </label>
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "rgba(255,255,255,0.3)" } as React.CSSProperties} />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Как вас зовут?"
                    className="msg-input w-full py-3 pl-11 pr-4 text-sm"
                    required
                  />
                </div>
              </div>
            )}

            {(mode === "login" || step === 2) && (
              <div className="animate-fade-in">
                <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Email
                </label>
                <div className="relative">
                  <Icon name="Mail" size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "rgba(255,255,255,0.3)" } as React.CSSProperties} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
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
                Шаг 1 из 2 — представьтесь
              </p>
            )}

            <button type="submit" className="btn-gradient w-full py-3.5 rounded-2xl font-semibold text-sm mt-2">
              {mode === "login" ? "Войти в аккаунт" : step === 1 ? "Продолжить →" : "Создать аккаунт"}
            </button>
          </form>

          {mode === "login" && (
            <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>
              Забыли пароль? <span className="underline cursor-pointer" style={{ color: "rgba(124,58,237,0.8)" }}>Восстановить</span>
            </p>
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
          Pulse · Защищённое соединение 🔒
        </p>
      </div>
    </div>
  );
}
