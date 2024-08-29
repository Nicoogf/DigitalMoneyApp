import Link from 'next/link'
import React from 'react'

const GetMoneyPage = () => {
  return (
    <section>
        <section className="mt-40">
        <Link href="/" className="p-2 rounded-lg bg-teal-500 text-white"> Transferencia </Link>
        <Link href="/dashboard/get-money/select-card" className="p-2 rounded-lg bg-teal-500 text-white"> SelectCard  </Link>
        </section>       
    </section>
  )
}

export default GetMoneyPage