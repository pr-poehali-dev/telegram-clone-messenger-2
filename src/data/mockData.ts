export interface Message {
  id: number;
  text: string;
  time: string;
  out: boolean;
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
}

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  online: boolean;
  lastSeen?: string;
}

export const chats: Chat[] = [
  {
    id: 1,
    name: "Алина Кравцова",
    avatar: "АК",
    lastMessage: "Отлично, увидимся завтра! 👋",
    time: "12:41",
    unread: 3,
    online: true,
    messages: [
      { id: 1, text: "Привет! Как дела?", time: "12:30", out: false },
      { id: 2, text: "Всё отлично, спасибо! А у тебя?", time: "12:31", out: true, read: true },
      { id: 3, text: "Тоже хорошо 😊 Ты завтра будешь на встрече?", time: "12:35", out: false },
      { id: 4, text: "Да, конечно! Во сколько начинается?", time: "12:37", out: true, read: true },
      { id: 5, text: "В 14:00, офис на Арбате", time: "12:39", out: false },
      { id: 6, text: "Отлично, увидимся завтра! 👋", time: "12:41", out: false },
    ]
  },
  {
    id: 2,
    name: "Команда проекта",
    avatar: "КП",
    lastMessage: "Дима: Деплой прошёл успешно ✅",
    time: "11:20",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Когда будет готов дизайн?", time: "10:00", out: false },
      { id: 2, text: "Уже делаю, через час пришлю", time: "10:05", out: true, read: true },
      { id: 3, text: "Отлично! Жду", time: "10:06", out: false },
      { id: 4, text: "Вот макеты: [figma.com/...]", time: "11:10", out: true, read: true },
      { id: 5, text: "Дима: Деплой прошёл успешно ✅", time: "11:20", out: false },
    ]
  },
  {
    id: 3,
    name: "Максим Орлов",
    avatar: "МО",
    lastMessage: "Спасибо за помощь!",
    time: "вчера",
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: "Привет, можешь помочь с задачей?", time: "вчера", out: false },
      { id: 2, text: "Конечно, что нужно?", time: "вчера", out: true, read: true },
      { id: 3, text: "Нужно настроить CI/CD", time: "вчера", out: false },
      { id: 4, text: "Давай разберём вместе", time: "вчера", out: true, read: true },
      { id: 5, text: "Спасибо за помощь!", time: "вчера", out: false },
    ]
  },
  {
    id: 4,
    name: "Дарья Смирнова",
    avatar: "ДС",
    lastMessage: "Хорошо, договорились 🤝",
    time: "Пн",
    unread: 1,
    online: false,
    messages: [
      { id: 1, text: "Можем перенести звонок на пятницу?", time: "Пн", out: false },
      { id: 2, text: "Да, в 15:00 подойдёт?", time: "Пн", out: true, read: true },
      { id: 3, text: "Хорошо, договорились 🤝", time: "Пн", out: false },
    ]
  },
  {
    id: 5,
    name: "Иван Петров",
    avatar: "ИП",
    lastMessage: "Отправил файлы на почту",
    time: "Вс",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Документы готовы?", time: "Вс", out: true, read: true },
      { id: 2, text: "Да, отправил файлы на почту", time: "Вс", out: false },
    ]
  },
  {
    id: 6,
    name: "Архив — Старый проект",
    avatar: "СП",
    lastMessage: "Проект завершён",
    time: "10 фев",
    unread: 0,
    online: false,
    archived: true,
    messages: [
      { id: 1, text: "Проект завершён", time: "10 фев", out: false },
    ]
  },
];

export const contacts: Contact[] = [
  { id: 1, name: "Алина Кравцова", avatar: "АК", phone: "+7 916 123-45-67", online: true },
  { id: 2, name: "Дарья Смирнова", avatar: "ДС", phone: "+7 925 234-56-78", online: false, lastSeen: "сегодня в 10:30" },
  { id: 3, name: "Иван Петров", avatar: "ИП", phone: "+7 903 345-67-89", online: false, lastSeen: "вчера в 22:15" },
  { id: 4, name: "Максим Орлов", avatar: "МО", phone: "+7 917 456-78-90", online: true },
  { id: 5, name: "Николай Фёдоров", avatar: "НФ", phone: "+7 926 567-89-01", online: false, lastSeen: "3 дня назад" },
  { id: 6, name: "Ольга Белова", avatar: "ОБ", phone: "+7 915 678-90-12", online: true },
  { id: 7, name: "Сергей Новиков", avatar: "СН", phone: "+7 909 789-01-23", online: false, lastSeen: "неделю назад" },
];
