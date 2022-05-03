import moment from "moment";
import { useEffect, useState } from "react";

import { getChatsBetweenUsers, getLatestMessage } from "../../../services/user.service";
import store from "../../../store";
// import { ChatHead } from "../../chat-head/chat-head";
import './chat-feed.scss';
export function ChatFeed({users, org, setUserId}) {

    useEffect(() => {
        getLastMessages()
        },[])
    const userDetails = store.getState().userDetails;
    const [latestMessages, setLatestMessages] = useState();
    const getLastMessages = async ()=> {
        const req = (user)=> {
            return {org_id: org.org_id,
            from_user: userDetails.uid,
            to_user: user.uid}
        }
        Promise.all(users.slice(1, users.length-1).map(user=>getLatestMessage(req(user)))).then(res=>{
            console.log(res);
            
            const latestMessages = res.map(r=>r.data.response.messages[0]);
            setLatestMessages(latestMessages);
        })
        // console.log(data);
    }
    function ChatHead({user,id}) {
        
        return (
          <div className={`chat-head`+(id===selectedUser ?' --selected':'')} onClick={()=>{setSelectedUser(id); setUserId(id)}}>
           <div className="chat-head-container">
              <div className='chat-title'>
                  {user.first_name}
              </div>
              <div className='chat-body'>
                  {latestMessages && (<><div className='chat-message'>{latestMessages[id]?.messsage}</div>
                  <div className='date'>{moment(latestMessages[id]?.time_sent).format('MMM DD')}</div></>)}
              </div>
           </div>
          </div>
        );
      }

    const [selectedUser, setSelectedUser] = useState(0);
    

    return (
        <div className="chat-feed" style={{height:'90vh',width:'22%', paddingRight:'10px'}}>
            <div className="chat-feed__container">
                { users.map((user,i)=><ChatHead key={i} id={i} user={user}  ></ChatHead>)}
            </div>
        </div>

    )
}