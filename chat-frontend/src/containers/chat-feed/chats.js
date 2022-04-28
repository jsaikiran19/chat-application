import { Avatar, TextareaAutosize } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import './chats.scss';
import moment from 'moment';
export function Chats() {

    useEffect(() => {
        // getChats();
    }, []);

    document.onkeydown = (ev)=>{ if(ev.key === 'Enter') {
        ev.preventDefault();
        sendMessage();
    } }  // on enter key press);    

    const [message, setMessage] = useState('');
    const sendMessage = () => {
        const new_messages = [...messages, { text: message, sender: 'me', time: moment(new Date()).format('hh:mm a') }];
        new_messages.sort((a, b) => {
            return a.dateCreated - b.dateCreated;
        });
        setMessages(new_messages);
        setMessage('');
     };
    const [messages, setMessages] = useState([{text: 'Hello', sender: 'other', time: moment(new Date()).format('hh:mm a')}]);
    const messageBubble = (message) => {
        return (
            <div className="message-bubble" style={{display:'flex',justifyContent:'flex-end', margin:'10px'}}>
                <div className="message-bubble-content" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="your-message-bubble-content-text" style={{width:'fit-content'}}>
                        {message.text}
                    </div>
                    <div className="message-bubble-time" > {message.time} </div>
                </div>
            </div>
        )
    }

    const otherMessageBubble = (message) => {
        return (
            <div className="other-message-bubble" style={{marginLeft:'10px'}}>
                <div className="message-bubble-content" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="message-bubble-content-details" style={{ display: 'flex' }}>
                        <div className="avatar">
                            <Avatar src={message.avatar} alt={message.otherUser} />
                        </div>
                        <div className="other-message-bubble-content-text">
                            {message.text}
                        </div>
                    </div>

                    <div className="message-bubble-time"> {message.time} </div>
                </div>
            </div>
        )
    }

    const date = '8:47 PM, Tue, Apr 26, 2022';
    return (
        <div className="chat-feed">
            <div className="chat-feed__header">
                <div className="chat-feed__header-title">
                    {'Vir'}
                </div>
                <div className="last-active-date">
                    {`Last active: ${date}`}
                </div>
            </div>
            <div className="chat-feed__body">

                <div className="chat-feed__body__messages">
                    {messages.map((message, index) => {
                        if (message.sender === 'me') {
                            return messageBubble(message);
                        } else {    
                            return otherMessageBubble(message);
                        }       
                    })}
                </div>
                <div className="chat-feed__body__message-input" style={{display:'flex', alignItems:'center'}}>
                <input type="text" onSubmit={()=>sendMessage()} onChange={(e)=>setMessage(e.target.value)} value={message} placeholder="Type a message.." className="input-text" style={{borderRadius:'15px',margin:'10px 20px'}} placeholder="Type a message..." />
                <SendIcon onClick={()=>sendMessage()} style={{marginLeft:'10px', fontSize:'30px'}} color="primary"/>
                </div>
            </div>
        </div>
    )
}