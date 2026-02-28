import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Setting {
  icon: string;
  label: string;
  desc: string;
  type: "toggle" | "select" | "action";
  value?: boolean | string;
  options?: string[];
}

const SECTIONS: { title: string; color: string; items: Setting[] }[] = [
  {
    title: "Уведомления",
    color: "#a78bfa",
    items: [
      { icon: "Bell", label: "Уведомления", desc: "Звуки и оповещения", type: "toggle", value: true },
      { icon: "Volume2", label: "Звук сообщений", desc: "Воспроизводить звук", type: "toggle", value: true },
      { icon: "BellOff", label: "Не беспокоить", desc: "Отключить все уведомления", type: "toggle", value: false },
    ]
  },
  {
    title: "Приватность",
    color: "#06b6d4",
    items: [
      { icon: "Eye", label: "Последний визит", desc: "Кто видит когда вы онлайн", type: "select", value: "Все", options: ["Все", "Контакты", "Никто"] },
      { icon: "UserCheck", label: "Статус онлайн", desc: "Показывать онлайн-статус", type: "toggle", value: true },
      { icon: "Shield", label: "Двухфакторная аутентификация", desc: "Дополнительная защита", type: "toggle", value: false },
    ]
  },
  {
    title: "Внешний вид",
    color: "#ec4899",
    items: [
      { icon: "Moon", label: "Тёмная тема", desc: "Используется сейчас", type: "toggle", value: true },
      { icon: "Type", label: "Размер шрифта", desc: "Стандартный", type: "select", value: "Средний", options: ["Маленький", "Средний", "Большой"] },
    ]
  },
  {
    title: "Данные",
    color: "#f59e0b",
    items: [
      { icon: "Download", label: "Авто-загрузка медиа", desc: "Загружать фото и видео", type: "toggle", value: true },
      { icon: "Trash2", label: "Очистить кэш", desc: "Освободить место", type: "action" },
    ]
  },
];

export default function SettingsPanel() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Уведомления": true,
    "Звук сообщений": true,
    "Не беспокоить": false,
    "Статус онлайн": true,
    "Двухфакторная аутентификация": false,
    "Тёмная тема": true,
    "Авто-загрузка медиа": true,
  });

  const [selects, setSelects] = useState<Record<string, string>>({
    "Последний визит": "Все",
    "Размер шрифта": "Средний",
  });

  return (
    <div className="flex flex-col h-full bg-mesh overflow-y-auto">
      <div className="px-6 pt-8 pb-4">
        <h2 className="text-2xl font-bold text-white mb-1">Настройки</h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Управление аккаунтом и приложением</p>
      </div>

      <div className="px-6 pb-8 space-y-5">
        {SECTIONS.map(section => (
          <div key={section.title} className="animate-fade-in">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 px-1"
              style={{ color: section.color + "cc" }}>
              {section.title}
            </h3>
            <div className="glass rounded-2xl overflow-hidden">
              {section.items.map((item, i) => (
                <div key={item.label}
                  className={`flex items-center gap-3 px-4 py-3.5 ${i < section.items.length - 1 ? "border-b border-white/5" : ""}`}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: section.color + "18" }}>
                    <Icon name={item.icon} size={17} style={{ color: section.color } as React.CSSProperties} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</p>
                  </div>

                  {item.type === "toggle" && (
                    <button
                      onClick={() => setToggles(prev => ({ ...prev, [item.label]: !prev[item.label] }))}
                      className="w-12 h-6 rounded-full relative transition-all flex-shrink-0"
                      style={{
                        background: toggles[item.label]
                          ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                          : "rgba(255,255,255,0.1)"
                      }}
                    >
                      <div className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all"
                        style={{ left: toggles[item.label] ? "calc(100% - 20px)" : "4px" }} />
                    </button>
                  )}

                  {item.type === "select" && item.options && (
                    <select
                      value={selects[item.label]}
                      onChange={e => setSelects(prev => ({ ...prev, [item.label]: e.target.value }))}
                      className="text-xs rounded-xl px-3 py-1.5 flex-shrink-0"
                      style={{
                        background: "rgba(124,58,237,0.2)",
                        color: "#a78bfa",
                        border: "1px solid rgba(124,58,237,0.3)"
                      }}
                    >
                      {item.options.map(o => <option key={o} value={o} style={{ background: "#0d0d1a" }}>{o}</option>)}
                    </select>
                  )}

                  {item.type === "action" && (
                    <button className="text-xs px-3 py-1.5 rounded-xl flex-shrink-0"
                      style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                      Очистить
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center pt-2">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>Pulse v1.0.0 · Все права защищены</p>
        </div>
      </div>
    </div>
  );
}
