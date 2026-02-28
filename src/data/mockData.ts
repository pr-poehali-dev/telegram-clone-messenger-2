export interface Message {
  id: number;
  text: string;
  time: string;
  out: boolean;
  authorNick?: string;
  read?: boolean;
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
  archived?: boolean;
  isChannel?: boolean;
  isGroup?: boolean;
  members?: string[];
}

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  online: boolean;
  lastSeen?: string;
}

export interface StoredUser {
  nick: string;
  email: string;
  password: string;
  registeredAt: string;
  banned?: boolean;
  muted?: boolean;
  banReason?: string;
  muteUntil?: string;
}

export const ADMIN_NICK = "CoNNectioN";

// Хранилище пользователей в памяти
export const usersStore: StoredUser[] = [
  {
    nick: "CoNNectioN",
    email: "admin@folozow.com",
    password: "admin123",
    registeredAt: "2024-01-01",
  }
];

export const chats: Chat[] = [
  {
    id: 1,
    name: "📢 FOLOZOW NEWS",
    avatar: "FN",
    lastMessage: "Добро пожаловать на сервер FOLOZOW MTA!",
    time: "12:00",
    unread: 1,
    online: true,
    isChannel: true,
    messages: [
      { id: 1, text: "📢 Добро пожаловать на официальный канал сервера FOLOZOW MTA!", time: "10:00", out: false, authorNick: "CoNNectioN" },
      { id: 2, text: "🎮 Сервер работает 24/7. IP: folozow.ru:22003", time: "10:05", out: false, authorNick: "CoNNectioN" },
      { id: 3, text: "🔥 Новое обновление v2.4 — добавлены новые машины и карты!", time: "11:30", out: false, authorNick: "CoNNectioN" },
      { id: 4, text: "⚠️ Читерство строго запрещено. Нарушители получат бан.", time: "11:45", out: false, authorNick: "CoNNectioN" },
      { id: 5, text: "📢 Добро пожаловать на сервер FOLOZOW MTA!", time: "12:00", out: false, authorNick: "CoNNectioN" },
    ]
  },
];

export const contacts: Contact[] = [
  { id: 1, name: "CoNNectioN", avatar: "CN", phone: "admin@folozow.com", online: true },
];
