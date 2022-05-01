import { useEffect, useState } from "react";
import { getChatsBetweenUsers } from "../../../services/user.service";
import store from "../../../store";
// import { ChatHead } from "../../chat-head/chat-head";
import './chat-feed.scss';
export function ChatFeed({users, org, setUserId}) {

    function ChatHead({user,id}) {
        console.log(id,selectedUser);
        return (
          <div className={`chat-head`+(id===selectedUser ?' --selected':'')} onClick={()=>{setSelectedUser(id); setUserId(id)}}>
           <div className="chat-head-container">
              <div className='chat-title'>
                  {user.first_name}
              </div>
              <div className='chat-body'>
                  <div className='chat-message'>hi</div>
                  <div className='date'>Apr 26</div>
              </div>
           </div>
          </div>
        );
      }

    const [selectedUser, setSelectedUser] = useState(0);
    console.log(users);

    return (
        <div className="chat-feed" style={{height:'90vh',width:'22%', paddingRight:'10px'}}>
            <div className="chat-feed__container">
                { users.map((user,i)=><ChatHead key={i} id={i} user={user}  ></ChatHead>)}
            </div>
        </div>

    )
}