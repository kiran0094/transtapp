interface SubtittleProps{
    text:string
}


const Subtittle = ({text}:SubtittleProps) => {
  return (
    <h2 className="text-gray-700 text-sm text-center ">{text}</h2>
  )
}

export default Subtittle