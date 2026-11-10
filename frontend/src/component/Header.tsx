interface HeadersProps{
    label:string
}
const Header = ({label}:HeadersProps) => {
  return (
    <div className='text-3xl py-3 font-bold text-center'>{label}</div>
  )
}

export default Header