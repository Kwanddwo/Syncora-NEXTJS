"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserInboxAPI } from "@/app/_api/InboxAPI";
import { Inbox } from "@/types";

type InboxContextType = {
  inbox: Inbox[];
  fetchInbox: () => void;
  inboxCount: number;
  setInbox: React.Dispatch<React.SetStateAction<Inbox[]>>;
  loading: boolean;
};

const InboxContext = createContext<InboxContextType | null>(null);

export const InboxProvider = ({ children }: { children: React.ReactNode }) => {
  const [inbox, setInbox] = useState<Inbox[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInbox = async () => {
    try {
      const data = await getUserInboxAPI();
      setInbox(data);
    } catch (error) {
      console.error("Failed to fetch inbox:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  return (
    <InboxContext.Provider
      value={{
        inbox,
        fetchInbox,
        setInbox,
        inboxCount: inbox.filter((i) => !i.read).length,
        loading,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
};

export const useInbox = () => {
  const context = useContext(InboxContext);
  if (!context) throw new Error("useInbox must be used inside InboxProvider");
  return context;
};
