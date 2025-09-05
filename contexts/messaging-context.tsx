"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderType: "farmer" | "consumer"
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
}

interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    type: "farmer" | "consumer"
    avatar?: string
  }[]
  lastMessage?: Message
  unreadCount: number
}

interface MessagingContextType {
  conversations: Conversation[]
  messages: { [conversationId: string]: Message[] }
  sendMessage: (conversationId: string, content: string) => void
  markAsRead: (conversationId: string) => void
  startConversation: (participantId: string, participantName: string, participantType: "farmer" | "consumer") => string
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined)

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      participants: [
        { id: "farmer1", name: "John Smith", type: "farmer" },
        { id: "consumer1", name: "Sarah Johnson", type: "consumer" },
      ],
      unreadCount: 2,
    },
    {
      id: "2",
      participants: [
        { id: "farmer2", name: "Mike Davis", type: "farmer" },
        { id: "consumer1", name: "Sarah Johnson", type: "consumer" },
      ],
      unreadCount: 0,
    },
  ])

  const [messages, setMessages] = useState<{ [conversationId: string]: Message[] }>({
    "1": [
      {
        id: "1",
        senderId: "farmer1",
        senderName: "John Smith",
        senderType: "farmer",
        receiverId: "consumer1",
        content: "Hi! Thanks for your interest in our organic tomatoes. They're freshly harvested this morning.",
        timestamp: new Date(Date.now() - 3600000),
        read: true,
      },
      {
        id: "2",
        senderId: "consumer1",
        senderName: "Sarah Johnson",
        senderType: "consumer",
        receiverId: "farmer1",
        content: "That sounds great! Are they pesticide-free? And when would be the best time for pickup?",
        timestamp: new Date(Date.now() - 1800000),
        read: true,
      },
      {
        id: "3",
        senderId: "farmer1",
        senderName: "John Smith",
        senderType: "farmer",
        receiverId: "consumer1",
        content:
          "Absolutely pesticide-free! We use only organic methods. You can pick them up anytime between 8 AM and 6 PM.",
        timestamp: new Date(Date.now() - 900000),
        read: false,
      },
    ],
    "2": [
      {
        id: "4",
        senderId: "consumer1",
        senderName: "Sarah Johnson",
        senderType: "consumer",
        receiverId: "farmer2",
        content: "Hello! I saw your carrots in the marketplace. Do you have any available for this weekend?",
        timestamp: new Date(Date.now() - 7200000),
        read: true,
      },
    ],
  })

  const sendMessage = (conversationId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "Current User",
      senderType: "consumer",
      receiverId: "other-user",
      content,
      timestamp: new Date(),
      read: false,
    }

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage],
    }))
  }

  const markAsRead = (conversationId: string) => {
    setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv)))
  }

  const startConversation = (
    participantId: string,
    participantName: string,
    participantType: "farmer" | "consumer",
  ) => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      participants: [
        { id: "current-user", name: "Current User", type: "consumer" },
        { id: participantId, name: participantName, type: participantType },
      ],
      unreadCount: 0,
    }

    setConversations((prev) => [...prev, newConversation])
    return newConversation.id
  }

  return (
    <MessagingContext.Provider
      value={{
        conversations,
        messages,
        sendMessage,
        markAsRead,
        startConversation,
      }}
    >
      {children}
    </MessagingContext.Provider>
  )
}

export function useMessaging() {
  const context = useContext(MessagingContext)
  if (context === undefined) {
    throw new Error("useMessaging must be used within a MessagingProvider")
  }
  return context
}
