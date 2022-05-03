import { Avatar, TextareaAutosize, CircularProgress, Popover } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import './chats.scss';
import moment from 'moment';
import store from '../../store';
import { getChatsBetweenUsers, putMessages } from '../../services/user.service';
import { Profile } from '../../components/messages/profile/profile';
export function Chats({ userId, org, orgUsers }) {

    const userDetails = store.getState().userDetails;
    const otherUser = orgUsers[userId];
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (orgUsers) {
            const req = { org_id: org.org_id, from_user: userDetails.uid, to_user: orgUsers[userId].uid };
            getChats(req);
        }

    }, [orgUsers, userId]);



    const receiveMessage = () => {
        // while(true) {
        setTimeout(() => {

        }, 1000);
        // }

    }

    const getChats = async (req) => {
        const { data } = await getChatsBetweenUsers(req);
        const messages = data?.response?.messages || [];

        setMessages(messages.reverse());
    }

    document.onkeydown = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            sendMessage();
        }
    }  // on enter key press);    


    const sendMessage = async () => {
        console.log(message);
        const req = {
            org_id: org.org_id,
            from_user: userDetails.uid,
            to_user: orgUsers[userId].uid,
            messsage: message
        };
        setMessages();
        const res = await putMessages(req);
        getChats(req);

        setMessage('');
    };
    const [messages, setMessages] = useState([]);
    const messageBubble = (message) => {
        return (
            <div className="message-bubble" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
                <div className="message-bubble-content" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="your-message-bubble-content-text" style={{ width: 'fit-content' }}>
                        {message.messsage}
                    </div>
                    <div className="message-bubble-time" > {moment(message.time_sent).format('hh:mm a')} </div>
                </div>
            </div>
        )
    }

    const otherMessageBubble = (message) => {
        return (
            <div className="other-message-bubble" style={{ marginLeft: '10px' }}>
                <div className="message-bubble-content" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="message-bubble-content-details" style={{ display: 'flex' }}>
                        <div className="avatar">
                            <Avatar src={message.avatar} alt={message.otherUser} />
                        </div>
                        <div className="other-message-bubble-content-text">
                            {message.messsage}
                        </div>
                    </div>

                    <div className="message-bubble-time"> {moment(message.time_sent).format('hh:mm a')} </div>
                </div>
            </div>
        )
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);


    const date = '8:47 PM, Tue, Apr 26, 2022';
    return (
        <div className="chat-feed">
            <div className="chat-feed__header">
                <div className="chat-feed__header-title" onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>
                    {otherUser.first_name}
                </div>
            </div>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                 <Profile id={orgUsers[userId].uid}></Profile>
            </Popover>
            <div className="chat-feed__body">

                <div className="chat-feed__body__messages">
                    {messages ? (messages.length ? (messages.map((message, index) => {
                        if (message.author_id === userDetails.uid) {
                            return messageBubble(message);
                        } else {
                            return otherMessageBubble(message);
                        }
                    })) : <div className="no-messages">No messages yet</div>) : <CircularProgress />}
                </div>
                <div className="chat-feed__body__message-input" style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Type a message.." className="input-text" style={{ borderRadius: '15px', margin: '10px 20px' }} placeholder="Type a message..." />
                    <SendIcon onClick={() => sendMessage()} style={{ marginLeft: '10px', fontSize: '30px' }} color="primary" />
                </div>
            </div>
        </div>
    )
}