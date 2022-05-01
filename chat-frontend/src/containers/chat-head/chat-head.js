import './chat-head.scss';
export function ChatHead2({user}) {
  return (
    <div className="chat-head">
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
