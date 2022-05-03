import { useState, useEffect } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { getChats } from "react-chat-engine";
import "./messages.scss";
import store from "../../store";
import { ChatApp } from "./chat-app/chat-app";
import { ChatHead } from "../../containers/chat-head/chat-head";
import { ChatFeed } from "../../containers/chat-feed/chat-feed-column/chat-feed-column";
import { Chats } from "../../containers/chat-feed/chats";
import { getChatsBetweenUsers, getOrgLevelUsers } from "../../services/user.service";
import { Profile } from "./profile/profile";


export function Messages({ org }) {
  const userDetails = store.getState().userDetails;
  const [orgUsers, setOrgUsers] = useState();
  useEffect(() => {
    getAllOrgUsers(org.org_id);
  }, [org]);
  
  const [userId, setUserId] = useState(0);

 

  
  const getAllOrgUsers = async (orgId) => {
    const { data } = await getOrgLevelUsers(orgId);
    console.log(data);
    setOrgUsers(data.response.user_details);
  }
 
  return (
    <>
      {orgUsers ? <div className="messages-container" style={{ display: 'flex' }}>
        <ChatFeed org={org} users={orgUsers} setUserId={setUserId} />
        <div className="messages-body" style={{ width: '45%', overflow: "hidden scroll" }}>
          <Chats userId={userId} orgUsers={orgUsers} org={org} />
        </div>
      </div> : <CircularProgress />}
    </>
  );
}
