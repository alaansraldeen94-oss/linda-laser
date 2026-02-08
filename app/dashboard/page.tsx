"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {

  const [total,setTotal] = useState(0);
  const [monthTotal,setMonthTotal] = useState(0);
  const [visitsCount,setVisitsCount] = useState(0);

  useEffect(()=>{
    const clients = JSON.parse(localStorage.getItem("clients") || "[]");

    let sum = 0;
    let monthSum = 0;
    let visits = 0;

    const currentMonth = new Date().getMonth();

    clients.forEach((client:any)=>{
      client.visits?.forEach((visit:any)=>{
        sum += visit.price;
        visits++;

        const visitMonth = new Date(visit.date).getMonth();
        if(visitMonth === currentMonth){
          monthSum += visit.price;
        }
      });
    });

    setTotal(sum);
    setMonthTotal(monthSum);
    setVisitsCount(visits);

  },[]);

  return (
    <>
      <Link href="/">
        <button style={homeBtn}>🏠 דף הבית</button>
      </Link>

      <div style={container}>

        <h1>📊 דשבורד העסק</h1>

        <div style={card}>
          <h2>💰 רווח כולל</h2>
          <p style={big}>{total} ₪</p>
        </div>

        <div style={card}>
          <h2>📅 רווח החודש</h2>
          <p style={big}>{monthTotal} ₪</p>
        </div>

        <div style={card}>
          <h2>👥 מספר טיפולים</h2>
          <p style={big}>{visitsCount}</p>
        </div>

      </div>
    </>
  );
}

const container:any = {
  padding:40,
  textAlign:"center",
  background:"linear-gradient(135deg,#0f0f0f,#1a1a1a)",
  minHeight:"100vh",
  color:"#fff"
};

const card:any = {
  background:"#fff",
  color:"#000",
  padding:30,
  marginTop:20,
  borderRadius:20,
  maxWidth:400,
  marginInline:"auto"
};

const big:any = {
  fontSize:40,
  fontWeight:"bold",
  color:"#e91e63"
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