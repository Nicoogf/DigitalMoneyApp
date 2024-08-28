'use client'
import { useCards } from '@/context/CardsContext'
import { useServices } from '@/context/ServiceContext'
import { useTransaction } from '@/context/TransactionsContext'
import { useAuth } from '@/context/UserContext'
import Link from 'next/link'
import React ,{useEffect} from 'react'


const HomePage = () => {
  const { isAutenticated ,credentialsUser , getDataUser, dataUser} = useAuth()
  const { listServices } = useServices()
  const {transactionsList , getListTransactions , getListTransferences, transferencesList} = useTransaction()
  const { cardsList ,fetchCards } = useCards()


  useEffect( () => {
    getDataUser(credentialsUser?.user_id)
    getListTransactions(credentialsUser?.id)
    getListTransferences(credentialsUser?.id)
    fetchCards(credentialsUser?.id)
},[credentialsUser])



  return (
    <div className="text-white flex flex-col  gap-y-10">
        Dashboard 
       
        <section className="flex flex-row gap-2">
        <p> esta autenticado ? </p>
        <p>{ credentialsUser ? "true" : "false" } </p>
        </section>
        

        <section className="flex flex-row gap-2">
        <p>Credenciales </p>
        <p> {JSON.stringify(credentialsUser)} </p>
        </section>

        <section className="flex flex-row gap-2">
        <p>Datos </p>
        <p> {JSON.stringify(dataUser)} </p>
        </section>

        <section className="flex flex-row gap-2">
        <p>Servicios </p>
        <p> {JSON.stringify(listServices)} </p>
        </section>

        {/* <section className="flex flex-row gap-2">
        <p>Transactions </p>
        <p> {JSON.stringify(transactionsList)} </p>
        </section> */}

        <section className="flex flex-row gap-2">
        <p>Transactions </p>
        <p> {JSON.stringify(transferencesList)} </p>
        </section>

        <section className="flex flex-row gap-2">
        <p>Cards </p>
        <p> {JSON.stringify(cardsList)} </p>
        </section>
      
      
    </div>
  )
}

export default HomePage