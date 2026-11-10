import React from 'react'

interface InputProps{
    title:string,
    value:string|number,
    placeholder:string;
    onChange:()=>void,
    type:string,
}

const Input = ({title,type,value,placeholder,onChange}:InputProps) => {
  return (
    <>
    <label className='text-sm pt-2 font-left font-semibold ' >{title} :</label>
    <input type={type} value={value} placeholder={placeholder} onChange={onChange} className='border rounded-md pl-1.5 py-1'  />
    </>
  )
}

export default Input