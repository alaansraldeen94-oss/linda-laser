"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Appointment = {
  id: number;
  name: string;
  phone: string;
  gender: "אישה" | "גבר";
  date: string;
  time: string;
  note: string;
  reminderSent?: boolean;
};

export default function AppointmentsPage() {

  const [items,setItems] = useState<Appointment[]>([]);

  // تحميل المواعيد
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("appointments") || "[]");
    setItems(data);
  },[]);

  // 🔔 تنبيه قبل الموعد + تشغيل صوت + فتح واتساب
  useEffect(()=>{

    const audio = new Audio("/alert.mp3");

    const interval = setInterval(()=>{

      const data:Appointment[] = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );

      const now = new Date();
      let updated = false;

      data.forEach((a)=>{

        const appointmentTime = new Date(a.date+" "+a.time);
        const diffMinutes =
          (appointmentTime.getTime() - now.getTime())/60000;

        // اذا باقي 30 دقيقة
        if(diffMinutes > 0 && diffMinutes <= 30 && !a.reminderSent){

          // تشغيل الصوت
          audio.play();

          // رسالة تنبيه
          alert(`🔔 יש תור קרוב ללקוחה ${a.name}`);

          // فتح واتساب تلقائي
          sendWhatsAppReminder(a.phone,a.name,a.date,a.time);

          a.reminderSent = true;
          updated = true;
        }

      });

      if(updated){
        localStorage.setItem("appointments",JSON.stringify(data));
        setItems(data);
      }

    },60000);

    return ()=>clearInterval(interval);

  },[]);

  // 📲 ارسال واتساب
  function sendWhatsAppReminder(
    phone:string,
    name:string,
    date:string,
    time:string
  ){
    const msg =
      `שלום ${name} 💗\n`+
      `תזכורת לתור שלך ב-Linda Laser ✨\n`+
      `📅 תאריך: ${date}\n`+
      `⏰ שעה: ${time}\n`+
      `נשמח לראותך 🌸`;

    const phoneFixed = phone.replace(/^0/,"972");
    const url = `https://wa.me/${phoneFixed}?text=${encodeURIComponent(msg)}`;
    window.open(url,"_blank");
  }

  // ترتيب المواعيد
  const sorted = useMemo(()=>{
    return [...items].sort((a,b)=>{
      const da = `${a.date}T${a.time}`;
      const db = `${b.date}T${b.time}`;
      return da.localeCompare(db);
    });
  },[items]);

  // حذف موعد
  const removeOne = (id:number)=>{
    const next = items.filter(x=>x.id !== id);
    setItems(next);
    localStorage.setItem("appointments",JSON.stringify(next));
  };

  return (
    <main style={{minHeight:"100vh",padding:24}} dir="rtl">

      <div style={{
        maxWidth:900,
        margin:"0 auto",
        background:"rgba(255,255,255,0.95)",
        borderRadius:20,
        padding:24,
        boxShadow:"0 10px 30px rgba(0,0,0,0.1)"
      }}>

        <div style={{display:"flex",justifyContent:"center"}}>
          <Image src="/logo.png" alt="logo" width={220} height={130}/>
        </div>

        <h1 style={{textAlign:"center",color:"#e91e63"}}>
          יומן תורים
        </h1>

        {/* أزرار التنقل */}
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <Link href="/"><button>🏠 דף הבית</button></Link>
          <Link href="/booking"><button>➕ קביעת תור חדש</button></Link>
        </div>

        {sorted.length === 0 ? (
          <p style={{textAlign:"center",marginTop:20}}>
            אין תורים עדיין
          </p>
        ) : (
          <div style={{marginTop:20,display:"grid",gap:14}}>

            {sorted.map(a=>(
              <div key={a.id} style={{
                border:"1px solid #f2d7e5",
                borderRadius:16,
                padding:16,
                background:"#fff"
              }}>

                <b>{a.name}</b> • {a.gender}
                <br/>
                📅 {a.date} ⏰ {a.time}
                <br/>
                📞 {a.phone}

                {a.note && (
                  <div style={{marginTop:6}}>
                    📝 {a.note}
                  </div>
                )}

                <div style={{marginTop:12,display:"flex",gap:10}}>

                  {/* زر واتساب يدوي */}
                  <button
                    onClick={()=>sendWhatsAppReminder(a.phone,a.name,a.date,a.time)}
                    style={{
                      padding:"9px 12px",
                      borderRadius:10,
                      border:"1px solid #25D366",
                      background:"#25D366",
                      color:"#fff",
                      fontWeight:700,
                      cursor:"pointer"
                    }}
                  >
                    שלח תזכורת WhatsApp
                  </button>

                  {/* حذف */}
                  <button
                    onClick={()=>removeOne(a.id)}
                    style={{
                      padding:"9px 12px",
                      borderRadius:10,
                      border:"1px solid #ffd0e2",
                      background:"#fff5fa",
                      color:"#b4004f",
                      fontWeight:700,
                      cursor:"pointer"
                    }}
                  >
                    מחיקת תור
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}