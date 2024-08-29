import Link from 'next/link'
import React from 'react'

const Nabvar = () => {
  return (
    <nav className="absolute top-2 w-full flex flex-row items-center justify-center gap-x-2">
    <Link href="/dashboard" className="p-2 rounded-md bg-blue-500 text-white">
    home
    </Link>
    <Link href="/dashboard/get-money" className="p-2 rounded-md bg-blue-500 text-white">
    depo
    </Link>
    <Link href="/dashboard/send-money" className="p-2 rounded-md bg-blue-500 text-white">
    send
    </Link>
    <Link href="/dashboard/services" className="p-2 rounded-md bg-blue-500 text-white">
    serv
    </Link>
    <Link href="/dashboard/cards" className="p-2 rounded-md bg-blue-500 text-white">
    card
    </Link>
    <Link href="/dashboard/profile" className="p-2 rounded-md bg-blue-500 text-white">
    prof
    </Link>
  </nav>
  )
}

export default Nabvar