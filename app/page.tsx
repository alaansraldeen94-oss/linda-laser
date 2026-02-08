"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [isLogged,setIsLogged] = useState(false);

  useEffect(()=>{
    const login = localStorage.getItem("isLoggedIn");
    if(login) setIsLogged(true);
  },[]);

  function logout(){
    localStorage.removeItem("isLoggedIn");
    window.location.href="/login";
  }

  return (
    <div style={container}>
      <div style={card}>

        <Image src="/logo.png" width={180} height={180} alt="logo" />
        <h1 style={title}>Linda Laser</h1>

        <Link href="/booking">
          <button style={button}>📅 קביעת תור חדש</button>
        </Link>

        <Link href="/clients">
          <button style={button}>👥 רשימת לקוחות</button>
        </Link>

        <Link href="/dashboard">
          <button style={button}>💰 דשבורד העסק</button>
        </Link>

        {/* يظهر فقط اذا المستخدم مش داخل */}
        {!isLogged && (
          <Link href="/login">
            <button style={loginBtn}>🔐 כניסה למערכת</button>
          </Link>
        )}

        {/* يظهر فقط اذا المستخدم داخل */}
        {isLogged && (
          <button style={logoutBtn} onClick={logout}>
            🚪 התנתקות
          </button>
        )}

      </div>
    </div>
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
  background:"#fff",
  padding:40,
  borderRadius:20,
  textAlign:"center",
  width:350
};

const title:any = {
  color:"#e91e63",
  marginBottom:10
};

const button:any = {
  width:"100%",
  padding:15,
  marginTop:15,
  borderRadius:12,
  border:"none",
  background:"linear-gradient(45deg,#ff2e78,#ff6aa2)",
  color:"#fff",
  fontSize:18,
  cursor:"pointer"
};

const loginBtn:any = {
  ...button,
  background:"#666"
};

const logoutBtn:any = {
  ...button,
  background:"#000"
};