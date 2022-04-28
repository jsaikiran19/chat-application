import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { getChats } from "react-chat-engine";
import "./messages.scss";
import store from "../../store";
import { ChatApp } from "./chat-app/chat-app";
import { ChatHead } from "../../containers/chat-head/chat-head";
import { ChatFeed } from "../../containers/chat-feed/chat-feed-column/chat-feed-column";
import { Chats } from "../../containers/chat-feed/chats";

export function Messages() {
  const userDetails = store.getState().userDetails;
  useEffect(() => {
    getChats();
  });
  return (
    <>
    <div className="messages-container" style={{display:'flex'}}>
      <ChatFeed/>
      <div className="messages-body" style={{width:'60%', overflow:"hidden scroll"}}>
        <Chats />
      </div>
    </div>
    </>
  );
}
