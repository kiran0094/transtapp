interface BottomtextProps{
    text:string;
    redirect_Link?:string
}


export default function Bottomtext({text,redirect_Link}:BottomtextProps){
    return(
        <>
        <p className="text-gray-700 text-sm text-center font-extralight">
            {redirect_Link?
            (<a href={redirect_Link} className="no-underline">
                {text}
            </a>)
            :
            (<span>{text}</span>)
            }
        </p>
        </>
    )
 }