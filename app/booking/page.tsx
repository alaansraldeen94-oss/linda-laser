"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BookingPage() {

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [service,setService] = useState("");
  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const [note,setNote] = useState("");
  const [payment,setPayment] = useState("");
  const [price,setPrice] = useState("");
  const [saved,setSaved] = useState(false);

  // 🔔 تنبيه قبل الموعد
  useEffect(()=>{
    const interval = setInterval(()=>{
      const clients = JSON.parse(localStorage.getItem("clients") || "[]");
      const now = new Date();

      clients.forEach((client:any)=>{
        client.visits?.forEach((visit:any)=>{
          const appointmentTime = new Date(visit.date+" "+visit.time);
          const diff = (appointmentTime.getTime() - now.getTime())/60000;

          if(diff > 0 && diff <= 10){
            alert(`🔔 موعد قريب للزبون ${client.name}`);
          }
        });
      });

    },60000);

    return ()=>clearInterval(interval);
  },[]);

  const saveAppointment = (e:any) => {
    e.preventDefault();

    if(!name || !phone || !date || !time || !service || !payment || !price){
      alert("נא למלא את כל הפרטים");
      return;
    }

    let clients = JSON.parse(localStorage.getItem("clients") || "[]");

    // ❌ منع حجز نفس الوقت
    let isBusy = false;
    clients.forEach((c:any)=>{
      c.visits?.forEach((v:any)=>{
        if(v.date === date && v.time === time){
          isBusy = true;
        }
      });
    });

    if(isBusy){
      alert("❌ השעה תפוסה! בחר שעה אחרת");
      return;
    }

    // إنشاء زيارة جديدة مع ID
    const visit = {
      id: Date.now(),
      date,
      time,
      service,
      payment,
      price: Number(price),
      note
    };

    let clientIndex = clients.findIndex((c:any)=> c.phone === phone);

    if(clientIndex !== -1){
      clients[clientIndex].name = name;
      clients[clientIndex].visits.push(visit);
    } else {
      const newClient = {
        id: Date.now(),
        name,
        phone,
        visits: [visit]
      };
      clients.push(newClient);
    }

    localStorage.setItem("clients", JSON.stringify(clients));

    setSaved(true);
    setName(""); setPhone(""); setService(""); setDate(""); setTime("");
    setNote(""); setPayment(""); setPrice("");

    setTimeout(()=>setSaved(false),3000);
  };

  return (
    <>
      <Link href="/">
        <button style={homeBtn}>🏠 דף הבית</button>
      </Link>

      <div style={container}>
        <form style={card} onSubmit={saveAppointment}>

          <img src="/logo.png" alt="logo" style={{width:220,marginBottom:10}} />

          <h2 style={title}>קביעת תור חדש</h2>

          {saved && <div style={success}>✔ התור נשמר בהצלחה</div>}

          <input style={input} placeholder="שם הלקוח/ה"
            value={name} onChange={(e)=>setName(e.target.value)} />

          <input style={input} placeholder="מספר טלפון"
            value={phone} onChange={(e)=>setPhone(e.target.value)} />

          <select style={input} value={service}
            onChange={(e)=>setService(e.target.value)}>
            <option value="">בחר סוג טיפול</option>
            <option>הסרת שיער נשים</option>
            <option>הסרת שיער גברים</option>
            <option>טיפול פנים</option>
          </select>

          <input style={input} type="date"
            value={date} onChange={(e)=>setDate(e.target.value)} />

          <input style={input} type="time"
            value={time} onChange={(e)=>setTime(e.target.value)} />

          <select style={input} value={payment}
            onChange={(e)=>setPayment(e.target.value)}>
            <option value="">طريقة الدفع</option>
            <option>מזומן</option>
            <option>אשראי</option>
          </select>

          <input style={input} placeholder="المبلغ"
            value={price} onChange={(e)=>setPrice(e.target.value)} />

          <textarea style={input} placeholder="הערות"
            value={note} onChange={(e)=>setNote(e.target.value)} />

          <button style={button}>שמירת התור</button>

        </form>
      </div>
    </>
  );
}

const container:any = {
  minHeight:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"linear-gradient(135deg,#0f0f0f,#1a1a1a)"
};

const card:any = {
  width:420,
  background:"#fff",
  padding:"30px",
  borderRadius:20,
  textAlign:"center"
};

const title:any = {
  color:"#e91e63",
  fontSize:26,
  marginBottom:20
};

const input:any = {
  width:"100%",
  padding:14,
  marginBottom:14,
  borderRadius:10,
  border:"2px solid #eee",
  fontSize:16
};

const button:any = {
  width:"100%",
  padding:16,
  borderRadius:12,
  background:"linear-gradient(45deg,#ff2e78,#ff6aa2)",
  color:"#fff",
  fontSize:18,
  border:"none",
  cursor:"pointer"
};

const success:any = {
  background:"#4caf50",
  color:"#fff",
  padding:10,
  borderRadius:8,
  marginBottom:15
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