import Icon from "@/components/ui/icon";

export default function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-mesh gap-6 animate-fade-in">
      <div className="relative">
        <div className="w-28 h-28 rounded-3xl flex items-center justify-center animate-glow"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))", border: "1px solid rgba(124,58,237,0.2)" }}>
          <Icon name="MessageCircle" size={52} style={{ color: "rgba(124,58,237,0.5)" } as React.CSSProperties} />
        </div>
        {/* Floating bubbles */}
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-xl flex items-center justify-center animate-float"
          style={{ background: "rgba(236,72,153,0.2)", animationDelay: "0s" }}>
          <span className="text-sm">💬</span>
        </div>
        <div className="absolute -bottom-2 -left-4 w-7 h-7 rounded-xl flex items-center justify-center animate-float"
          style={{ background: "rgba(6,182,212,0.2)", animationDelay: "1s" }}>
          <span className="text-xs">✨</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Выберите чат</h3>
        <p className="text-sm max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
          Нажмите на диалог слева, чтобы начать общение
        </p>
      </div>
      <div className="flex gap-2">
        {["💬", "🚀", "✨", "❤️"].map((e, i) => (
          <div key={i} className="w-8 h-8 rounded-xl flex items-center justify-center animate-float"
            style={{ background: "rgba(255,255,255,0.04)", animationDelay: `${i * 0.3}s` }}>
            <span className="text-sm">{e}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
