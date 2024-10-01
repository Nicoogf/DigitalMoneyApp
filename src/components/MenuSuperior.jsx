'use client'
import Image from "next/image"
import Link from "next/link"
import LogoOff from "../../public/logo-off.png"
import { useAuth } from "@/context/UserContext"

const MenuSuperior = ({ text ,link }) => {  
  const { setContextErrors } = useAuth()

    return (
      <nav className='absolute top-0 w-full bg-greenlime p-3 flex flex-row justify-between'>
        <Image src={LogoOff} alt="Logo Digital Money" className='w-16 object-contain ml-4' />
        <Link href={`${link}`} className='bg-greylight text-white rounded-lg px-3 py-2 font-semibold mr-4' onClick={() => setContextErrors([])}> {text} </Link>
  
      </nav>
    )
  }
  
  export default MenuSuperior