import { useState } from "react"

export default function useConection(){
    const[Online,SetOnline] = useState(true)
    window.addEventListener("online",()=>{
        SetOnline(true)
    })
    window.addEventListener("offline",()=>{
        SetOnline(false)
    })
    return Online
}