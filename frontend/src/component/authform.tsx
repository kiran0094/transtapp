import React from 'react'
import Input from './input';
import Header from './Header';
import Button from './Button';
import Bottomtext from './BottomText';
import Subtittle from './Subtittle';
interface AuthformProps{

  title:string;
  subtitle:string;
  shema: {
    title: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
    onclick: (event: React.MouseEvent<Element>) => void;
    buttonTittle:string,
    bottomtext:string;
    redirect_Link?:string
}

const Authform = ({title,subtitle,shema,buttonTittle,onclick,bottomtext,redirect_Link}:AuthformProps) => {
  return (
    <main className='flex flex-col gap-2 min-w-[350px]  border-2 p-3 px-6 rounded-2xl shadow-xl '>
       
       <div>
        <Header label={title}/>
        <Subtittle text={subtitle}/>
       </div>
        {shema.map((e)=>{
            return(
           <Input key={e.title} title={e.title} placeholder={e.placeholder} type={e.type} value={e.value} onChange={(event?: React.ChangeEvent<HTMLInputElement>) => { if (event) e.onChange(event); }} />
            )
        })}
        <div className='my-3.5'>

        <Button onclick={onclick} className='mb-2'><span>{buttonTittle}</span></Button>
        <Bottomtext text={bottomtext} redirect_Link={redirect_Link}/>
        </div>
        
        

    </main>
  )
}

export default Authform