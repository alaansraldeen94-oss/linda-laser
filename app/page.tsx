import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{fontFamily:"sans-serif"}}>

      {/* HERO SECTION */}
      <section style={{
        background:"#ffe4ef",
        padding:"80px 20px",
        textAlign:"center"
      }}>
        <h1 style={{fontSize:"48px", marginBottom:20}}>
          Linda Laser Clinic ✨
        </h1>

        <p style={{fontSize:"20px", marginBottom:30}}>
          إزالة الشعر بالليزر بأحدث الأجهزة وبأفضل النتائج
        </p>

        <div style={{display:"flex", gap:20, justifyContent:"center"}}>
          
          {/* زر الحجز */}
          <Link href="/appointments">
            <button style={{
              padding:"15px 30px",
              fontSize:"18px",
              background:"#ff4da6",
              color:"white",
              border:"none",
              borderRadius:10,
              cursor:"pointer"
            }}>
              احجزي موعد الآن
            </button>
          </Link>

          {/* زر واتساب */}
          <a
            href="https://wa.me/972528927057"
            target="_blank"
          >
            <button style={{
              padding:"15px 30px",
              fontSize:"18px",
              background:"#25D366",
              color:"white",

              border:"none",
              borderRadius:10,
              cursor:"pointer"
            }}>
              واتساب مباشر
            </button>
          </a>

        </div>
      </section>


      {/* الخدمات */}
      <section style={{padding:"60px 20px", textAlign:"center"}}>
        <h2 style={{fontSize:32, marginBottom:40}}>الخدمات</h2>

        <div style={{
          display:"flex",
          justifyContent:"center",
          gap:30,
          flexWrap:"wrap"
        }}>

          {[
            "ليزر جسم كامل",
            "ليزر وجه",
            "ليزر مناطق صغيرة",
            "جلسات عروض وبكجات"
          ].map(service => (
            <div key={service} style={{
              width:250,
              padding:20,
              borderRadius:15,
              boxShadow:"0 0 15px rgba(0,0,0,0.1)"
            }}>
              <h3>{service}</h3>
            </div>
          ))}

        </div>
      </section>


      {/* لماذا نحن */}
      <section style={{
        background:"#fafafa",
        padding:"60px 20px",
        textAlign:"center"
      }}>
        <h2 style={{fontSize:32, marginBottom:30}}>
          لماذا Linda Laser ؟
        </h2>

        <p style={{fontSize:18}}>
          ✔ أجهزة حديثة  
          ✔ نتائج سريعة وآمنة  
          ✔ أسعار منافسة  
          ✔ اهتمام كامل بكل زبونة
        </p>
      </section>


      {/* CTA اخر الصفحة */}
      <section style={{
        padding:"70px 20px",
        textAlign:"center"
      }}>
        <h2 style={{fontSize:32, marginBottom:20}}>
          جاهزة تبدأي رحلتك معنا؟ 💖
        </h2>

        <Link href="/appointments">
          <button style={{
            padding:"18px 40px",
            fontSize:"20px",
            background:"#ff4da6",
            color:"white",
            border:"none",
            borderRadius:12,
            cursor:"pointer"
          }}>
            احجزي موعدك الآن
          </button>
        </Link>
      </section>

    </main>
  );
}