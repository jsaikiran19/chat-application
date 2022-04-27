import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { getChats } from "react-chat-engine";
import "./messages.scss";
import store from "../../store";
import { ChatApp } from "./chat-app/chat-app";
import { ChatHead } from "../../containers/chat-head/chat-head";

export function Messages() {
  const userDetails = store.getState().userDetails;
  useEffect(() => {
    getChats();
  });
  return (
    <div className="messages-container">
      {/* <div className="chats-list-container">
        <ChatHead />
      </div> */}

      <div className="messages-body">{userDetails && <ChatApp />}</div>
    </div>
  );
}
