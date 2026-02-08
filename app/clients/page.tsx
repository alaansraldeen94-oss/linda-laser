"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientsPage() {

  const [clients,setClients] = useState<any[]>([]);
  const [search,setSearch] = useState("");

  // تحميل العملاء
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("clients") || "[]");
    setClients(data);
  },[]);

  // 📲 ارسال رسالة واتساب
  function sendWhatsApp(phone:string, name:string, visit:any){
    const message =
      `שלום ${name}! 👋\n` +
      `תזכורת לתור שלך ב-Linda Laser ✨\n` +
      `📅 תאריך: ${visit.date}\n` +
      `⏰ שעה: ${visit.time}\n` +
      `💆 טיפול: ${visit.service}\n` +
      `מחכים לראותך 💗`;

    const phoneFixed = phone.replace(/^0/,"972");
    const url = `https://wa.me/${phoneFixed}?text=${encodeURIComponent(message)}`;
    window.open(url,"_blank");
  }

  // 🔔 تذكير تلقائي قبل 24 ساعة
  useEffect(()=>{
    const interval = setInterval(()=>{
      const data = JSON.parse(localStorage.getItem("clients") || "[]");
      const now = new Date();

      data.forEach((client:any)=>{
        client.visits?.forEach((visit:any)=>{
          const appointmentTime = new Date(visit.date+" "+visit.time);
          const diffHours =
            (appointmentTime.getTime() - now.getTime()) / 3600000;

          if(diffHours <= 24 && diffHours > 23){
            if(visit.reminderSent) return;
            sendWhatsApp(client.phone, client.name, visit);
            visit.reminderSent = true;
            localStorage.setItem("clients", JSON.stringify(data));
          }
        });
      });

    },60000);

    return ()=> clearInterval(interval);
  },[]);

  // حذف عميل
  function deleteClient(id:number){
    const updated = clients.filter((c:any)=> c.id !== id);
    setClients(updated);
    localStorage.setItem("clients", JSON.stringify(updated));
  }

  const filteredClients = clients.filter((client:any)=>
    client.name.includes(search) || client.phone.includes(search)
  );

  return (
    <>
      <Link href="/">
        <button style={homeBtn}>🏠 דף הבית</button>
      </Link>

      <div style={container}>

        <h1>רשימת לקוחות</h1>

        <input
          placeholder="חיפוש לפי שם או טלפון"
          style={searchBox}
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        {filteredClients.length === 0 && <p>אין לקוחות עדיין</p>}

        {filteredClients.map((client:any)=>{

          const nextVisit = client.visits[client.visits.length - 1];

          return (
            <div key={client.id} style={card}>

              <h2>👤 {client.name}</h2>
              <p>📞 {client.phone}</p>

              <button
                style={whatsappBtn}
                onClick={() => sendWhatsApp(client.phone, client.name, nextVisit)}
              >
                שלח תזכורת WhatsApp
              </button>

              <button
                style={deleteBtn}
                onClick={() => deleteClient(client.id)}
              >
                מחק לקוח
              </button>

              <h3 style={{marginTop:20}}>היסטוריית טיפולים:</h3>

              {client.visits.map((v:any,i:number)=>(
                <div key={i} style={visit}>
                  <p>📅 {v.date}</p>
                  <p>⏰ {v.time}</p>
                  <p>💆 {v.service}</p>
                  <p>💰 תשלום: {v.payment}</p>
                  <p>💵 סכום: {v.price} ₪</p>
                  <p>📝 הערות: {v.note}</p>
                </div>
              ))}

            </div>
          )
        })}

      </div>
    </>
  );
}

const container:any = {
  padding:40,
  direction:"rtl",
  fontFamily:"Arial"
};

const card:any = {
  background:"#fff",
  padding:20,
  marginTop:20,
  borderRadius:12,
  boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
};

const visit:any = {
  background:"#f3f3f3",
  padding:10,
  marginTop:10,
  borderRadius:8
};

const searchBox:any = {
  width:"100%",
  padding:12,
  marginTop:20,
  marginBottom:20,
  borderRadius:10,
  border:"2px solid #ddd",
  fontSize:16
};

const deleteBtn:any = {
  background:"#ff4d4d",
  color:"#fff",
  border:"none",
  padding:"6px 12px",
  borderRadius:8,
  cursor:"pointer",
  marginTop:10,
  marginRight:10
};

const whatsappBtn:any = {
  background:"#25D366",
  color:"#fff",
  border:"none",
  padding:"6px 12px",
  borderRadius:8,
  cursor:"pointer",
  marginTop:10,
  marginRight:10
};

const homeBtn:any = {
  position:"fixed",
  top:20,
  left:20,
  padding:"10px 16px",
  borderRadius:10,
  border:"none",
  background:"#ff2e78",
  color:"#fff",
  fontSize:16,
  cursor:"pointer",
  zIndex:9999
};