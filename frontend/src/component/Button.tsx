import type React from "react"

interface ButtonProps{
    children:React.ReactNode
    className?:string
    onclick?:(e:React.MouseEvent)=>void

}

const Button=({children,className,onclick}:ButtonProps)=>{
    return(
        <button className={`${className} w-full px-2 py-2 rounded-2xl bg-black text-white font-semibold`} onClick={onclick}>
            {children}
        </button>
    )

}
export default Button