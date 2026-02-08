"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  function handleLogin(e:any){
    e.preventDefault();

    if(username === "Lindaabu_" && password === "Linda123456"){
      localStorage.setItem("isLoggedIn","true");
      router.push("/"); // يدخل للنظام
    }else{
      alert("שם משתמש או סיסמה שגויים");
    }
  }

  return (
    <div style={container}>
      <form style={card} onSubmit={handleLogin}>
        <h2>🔐 כניסה למערכת</h2>

        <input
          style={input}
          placeholder="שם משתמש"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button style={button}>כניסה</button>
      </form>
    </div>
  );
}

const container:any = {
  minHeight:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"#111"
};

const card:any = {
  background:"#fff",
  padding:30,
  borderRadius:20,
  width:320,
  textAlign:"center"
};

const input:any = {
  width:"100%",
  padding:12,
  marginTop:15,
  borderRadius:10,
  border:"1px solid #ccc"
};

const button:any = {
  width:"100%",
  padding:12,
  marginTop:20,
  borderRadius:10,
  border:"none",
  background:"#ff2e78",
  color:"#fff",
  fontSize:18
};