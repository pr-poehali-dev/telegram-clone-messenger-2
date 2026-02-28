import { useState } from "react";
import AuthScreen from "@/components/messenger/AuthScreen";
import Sidebar from "@/components/messenger/Sidebar";
import ChatList from "@/components/messenger/ChatList";
import ChatWindow from "@/components/messenger/ChatWindow";
import ContactsPanel from "@/components/messenger/ContactsPanel";
import SearchPanel from "@/components/messenger/SearchPanel";
import ProfilePanel from "@/components/messenger/ProfilePanel";
import SettingsPanel from "@/components/messenger/SettingsPanel";
import AdminPanel from "@/components/messenger/AdminPanel";
import EmptyChat from "@/components/messenger/EmptyChat";
import { Chat } from "@/data/mockData";

type Section = "chats" | "contacts" | "archive" | "search" | "profile" | "settings" | "admin";

export default function Index() {
  const [user, setUser] = useState<{ name: string; email: string; nick: string } | null>(null);
  const [section, setSection] = useState<Section>("chats");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [groupChats, setGroupChats] = useState<Chat[]>([]);

  if (!user) {
    return <AuthScreen onAuth={setUser} />;
  }

  const handleNav = (s: Section) => {
    setSection(s);
    if (s !== "chats" && s !== "archive") setSelectedChat(null);
  };

  const handleGroupCreated = (chat: Chat) => {
    setGroupChats(prev => [...prev, chat]);
    setSelectedChat(chat);
    setSection("chats");
  };

  const isFullPanel = section === "contacts" || section === "search" || section === "profile" || section === "settings" || section === "admin";

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: "#080812" }}>
      <Sidebar active={section} onNav={handleNav} user={user} />

      <div className="flex flex-1 min-w-0 overflow-hidden">
        {isFullPanel ? (
          <div className="flex-1 overflow-hidden animate-fade-in">
            {section === "contacts" && <ContactsPanel />}
            {section === "search" && <SearchPanel />}
            {section === "profile" && <ProfilePanel user={user} onLogout={() => setUser(null)} />}
            {section === "settings" && <SettingsPanel />}
            {section === "admin" && <AdminPanel />}
          </div>
        ) : (
          <>
            <div className="flex-shrink-0 overflow-hidden animate-slide-left" style={{ width: 300, background: "#0f0f1f" }}>
              <ChatList
                onSelect={setSelectedChat}
                selectedId={selectedChat?.id}
                archived={section === "archive"}
                currentNick={user.nick}
                extraChats={groupChats}
                onGroupCreated={handleGroupCreated}
              />
            </div>

            <div className="flex-1 overflow-hidden animate-fade-in">
              {selectedChat
                ? <ChatWindow chat={selectedChat} user={user} />
                : <EmptyChat />
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}
