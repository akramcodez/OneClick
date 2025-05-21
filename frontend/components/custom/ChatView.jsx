'use client';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { MessagesContext } from '@/context/messages.context';
import axios from 'axios';
import Prompt from '@/data/Prompt';

const ChatView = () => {
  const { id } = useParams();
  const { messages, setMessages } = useContext(MessagesContext);

  // load existing workspace messages
  const result = useQuery(api.workspace.GetWorkspace, { workspaceId: id });
  useEffect(() => {
    if (result) setMessages(result.message);
  }, [result, setMessages]);

  // when the user message arrives, call AI
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.role === 'user') {
      getAiResponse(messages);
    }
  }, [messages]);

  async function getAiResponse(messagesArr) {
    // build prompt: JSON array + your CHAT_PROMPT
    const PROMPT = JSON.stringify(messagesArr) + Prompt.CHAT_PROMPT;

    try {
      const { data } = await axios.post('/api/ai-chat', { prompt: PROMPT });
      const assistantText = data.message;
      console.log('🤖 AI says:', assistantText);

      // append assistant response to context
      setMessages([
        ...messagesArr,
        { role: 'assistant', content: assistantText },
      ]);
    } catch (err) {
      console.error('Error fetching AI response', err);
    }
  }

  return (
    <div>
      <h2>ChatView</h2>
      {messages.map((m, i) => (
        <p key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
          <strong>{m.role}:</strong> {m.content}
        </p>
      ))}
    </div>
  );
};

export default ChatView;
