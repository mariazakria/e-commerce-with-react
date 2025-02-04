import { createContext, useState } from "react";

export const UserContext = createContext(null);
export default function UserProvider({children}){
    // lw l2eto f local storage sebo mfesh 7oto b null 3shan msh kol mra y3mli refresh y5rog mnha aw mfesh token aslun
    const[token,SetToken]= useState(localStorage.getItem("Token") || null)
    function logout(){
        SetToken(null)
        localStorage.removeItem("Token")
    }
    return        <UserContext.Provider value={{ token, SetToken , logout }}>
    {children}
</UserContext.Provider>

}