import React, { createContext } from 'react';

export const MessagesContext = createContext({
  messages: [],
  setMessages: () => {},
});
