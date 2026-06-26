'use client';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ChatClient({ currentUser, allUsers }: { currentUser: any, allUsers: any[] }) {
  const [activeUser, setActiveUser] = useState<any>(null);
  const [text, setText] = useState('');
  
  const { data: messages, mutate } = useSWR(activeUser ? `/api/messages?chatWith=${activeUser.id}` : null, fetcher, { refreshInterval: 2000 });

  const sendMessage = async () => {
    if (!text.trim() || !activeUser) return;
    await fetch('/api/messages', { method: 'POST', body: JSON.stringify({ receiverId: activeUser.id, content: text }) });
    setText('');
    mutate();
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12 h-[80vh] flex gap-6">
      <div className="w-1/3 glass-card rounded-3xl p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Directory</h2>
        {allUsers.map(u => (
           <div key={u.id} onClick={() => setActiveUser(u)} className={`p-4 rounded-xl mb-2 cursor-pointer transition ${activeUser?.id === u.id ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'}`}>
             <p className="font-semibold">{u.name}</p>
             <p className="text-xs text-white/50">{u.department}</p>
           </div>
        ))}
      </div>
      <div className="flex-1 glass-card rounded-3xl p-6 flex flex-col">
         {activeUser ? (
           <>
             <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-4">
               {messages?.map((m: any) => (
                 <div key={m.id} className={`max-w-[70%] p-3 rounded-xl ${m.senderId === currentUser.id ? 'bg-blue-600 self-end' : 'bg-white/10 self-start'}`}>
                   {m.content}
                 </div>
               ))}
             </div>
             <div className="flex gap-2">
               <input type="text" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 bg-[#111] rounded-full px-6 py-3 outline-none" />
               <button onClick={sendMessage} className="bg-white text-black px-6 rounded-full font-semibold">Send</button>
             </div>
           </>
         ) : <div className="m-auto text-white/30">Select a user to start chatting</div>}
      </div>
    </div>
  );
}