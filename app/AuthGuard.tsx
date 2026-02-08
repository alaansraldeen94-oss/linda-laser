"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: any) {

  const router = useRouter();
  const pathname = usePathname();
  const [checked,setChecked] = useState(false);

  useEffect(()=>{

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // إذا المستخدم مش داخل
    if(!isLoggedIn && pathname !== "/login"){
      router.replace("/login");
    }

    // إذا المستخدم داخل وفتح login يرجعه للصفحة الرئيسية
    if(isLoggedIn && pathname === "/login"){
      router.replace("/");
    }

    setChecked(true);

  },[pathname]);

  if(!checked) return null;

  return children;
}