"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Search, MessageCircle } from "lucide-react"
import { useMessaging } from "@/contexts/messaging-context"

export default function MessagesPage() {
  const { conversations, messages, sendMessage, markAsRead } = useMessaging()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.participants.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      sendMessage(selectedConversation, newMessage.trim())
      setNewMessage("")
    }
  }

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId)
    markAsRead(conversationId)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Messages</h1>
        <p className="text-emerald-600">Connect with farmers and consumers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Conversations
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {filteredConversations.map((conversation) => {
                const otherParticipant = conversation.participants.find((p) => p.id !== "current-user")
                return (
                  <div
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                      selectedConversation === conversation.id ? "bg-emerald-50 border-l-4 border-l-emerald-500" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-emerald-100 text-emerald-700">
                          {otherParticipant?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{otherParticipant?.name}</p>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 capitalize">{otherParticipant?.type}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <CardTitle>
                  {
                    conversations
                      .find((c) => c.id === selectedConversation)
                      ?.participants.find((p) => p.id !== "current-user")?.name
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-full">
                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
                  {(messages[selectedConversation] || []).map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === "current-user"
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === "current-user" ? "text-emerald-100" : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="bg-emerald-600 hover:bg-emerald-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a conversation to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
