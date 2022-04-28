import { ChatHead } from "../../chat-head/chat-head";
import './chat-feed.scss';

export function ChatFeed() {
    return (
        <div className="chat-feed" style={{height:'90vh',width:'25%', paddingRight:'10px'}}>
            <div className="chat-feed__container">
                <ChatHead></ChatHead>
            </div>
        </div>

    )
}