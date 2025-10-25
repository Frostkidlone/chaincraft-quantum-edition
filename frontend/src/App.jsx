import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cellframe from '../../mock_adapters/cellframe-sdk-mock';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function short(addr){ return addr ? addr.slice(0,6)+'...'+addr.slice(-4) : ''; }

export default function App(){
  const [account, setAccount] = useState('');
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [activity, setActivity] = useState({ nfts: [], messages: [] });
  const [toAddr, setToAddr] = useState('');
  const [msgText, setMsgText] = useState('');

  useEffect(()=>{ fetchActivity(); cellframe.init(); }, []);

  async function connectWallet(){
    if(window.ethereum){
      try{
        const ac = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(ac[0]);
        const res = await axios.get(`${API}/api/profile/${ac[0]}`);
        setProfile(res.data);
        fetchNfts(ac[0]);
      }catch(e){ alert('Wallet connect failed'); }
    }else{
      // Mock wallet for demo
      const mock = '0xMOCK'+Math.floor(Math.random()*1e6).toString(16);
      setAccount(mock);
      setProfile(null);
      fetchNfts(mock);
    }
  }

  async function saveProfile(){
    if(!account) return alert('Connect wallet first');
    await axios.post(`${API}/api/profile`, { wallet: account, username });
    const res = await axios.get(`${API}/api/profile/${account}`);
    setProfile(res.data);
    setUsername('');
  }

  async function mint(){
    if(!account) return alert('Connect wallet first');
    const name = 'ChainCraftItem #' + Math.floor(Math.random()*10000);
    const uri = 'https://chaincraft.local/metadata/'+Date.now();
    const res = await axios.post(`${API}/api/mint`, { wallet: account, name, uri });
    setNfts(prev => [res.data.nft, ...prev]);
    fetchActivity();
  }

  async function fetchNfts(w){
    if(!w) return;
    const res = await axios.get(`${API}/api/nfts/${w}`);
    setNfts(res.data || []);
  }

  async function sendMessage(){
    if(!account) return alert('Connect wallet first');
    if(!toAddr || !msgText) return alert('to and message required');
    await axios.post(`${API}/api/message`, { from: account, to: toAddr, text: msgText });
    setMsgText('');
    fetchActivity();
  }

  async function fetchActivity(){
    try{
      const res = await axios.get(`${API}/api/activity`);
      setActivity(res.data);
    }catch(e){ console.error(e); }
  }

  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">ChainCraft • Quantum Edition</h1>
        <div>
          {account ? (
            <button className="px-3 py-1 bg-purple-600 text-white rounded">{short(account)}</button>
          ) : (
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </header>

      <section className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Profile</h2>
        {profile ? (
          <div>
            <p><strong>{profile.username}</strong> — {short(profile.wallet)}</p>
          </div>
        ) : (
          <div className="flex gap-2">
            <input className="border p-2 rounded flex-1" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
            <button className="bg-green-600 text-white px-3 rounded" onClick={saveProfile}>Save</button>
          </div>
        )}
      </section>

      <section className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Mint</h2>
        <p className="text-sm mb-2">Mint a mock NFT (for demo). This calls the backend and records an NFT in the in-memory DB.</p>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={mint}>Mint NFT</button>
        <div className="mt-3">
          {nfts.map(n=>(
            <div key={n.id} className="p-2 border rounded mb-2">
              <div className="text-sm font-medium">{n.name}</div>
              <div className="text-xs text-gray-500">Owner: {short(n.owner)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Chat (mock XMTP)</h2>
        <div className="flex gap-2 mb-2">
          <input className="border p-2 rounded flex-1" placeholder="to wallet address" value={toAddr} onChange={e=>setToAddr(e.target.value)} />
          <input className="border p-2 rounded flex-1" placeholder="message" value={msgText} onChange={e=>setMsgText(e.target.value)} />
          <button className="bg-yellow-600 text-white px-3 rounded" onClick={sendMessage}>Send</button>
        </div>
      </section>

      <section className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Activity Feed</h2>
        <div className="space-y-2">
          {activity.nfts.map(n=>(
            <div key={'a'+n.id} className="p-2 border rounded">
              <div className="text-sm"><strong>Minted:</strong> {n.name}</div>
              <div className="text-xs text-gray-500">By {short(n.owner)}</div>
            </div>
          ))}
          {activity.messages.map((m,i)=>(
            <div key={'m'+i} className="p-2 border rounded">
              <div className="text-sm"><strong>Msg:</strong> {m.text}</div>
              <div className="text-xs text-gray-500">{short(m.from)} → {short(m.to)}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
