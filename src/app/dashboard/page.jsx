'use client'
import { useCards } from '@/context/CardsContext'
import { useServices } from '@/context/ServiceContext'
import { useTransaction } from '@/context/TransactionsContext'
import { useAuth } from '@/context/UserContext'
import Link from 'next/link'
import React ,{useEffect} from 'react'


const HomePage = () => {
  const { 
    credentialsUser ,  // id id_user amount cvu alias
    dataUser , // name lastname dni email
    loading , // esta cargando ?
    setLoading ,
    getDataUser // trae los datos del user
  } = useAuth()

  const { listServices } = useServices()
  const { transactionsList ,  transferencesList ,getListTransferences ,getListTransactions} = useTransaction()
  const { cardsList  } = useCards()

useEffect(() => {
  const fetchData = async() => {
    if( credentialsUser?.user_id){
      await getDataUser(credentialsUser?.user_id)  
      await getListTransferences(credentialsUser?.id)
      // await getListTransactions(credentialsUser?.id)
    }
    setLoading(false);  
  }
  fetchData()
},[credentialsUser])

  return (
    <div className="text-white flex flex-col  gap-y-10">
        Dashboard 
       
        <section className="flex flex-row gap-2">
        <p> esta autenticado ? </p>
        <p>{ credentialsUser ? "true" : "false" } </p>
        </section>
    

        <h1 className="text-center text-5xl font-bold"> ${credentialsUser?.available_amount} </h1>
        <h3> esta cargando ? {loading ? "si" : "no"}  </h3>
        

        <section className="flex flex-row gap-2">
        <p>Credenciales </p>
        <p> {JSON.stringify(credentialsUser)} </p>
        </section>

        <section className="flex flex-row gap-2">
        <p>Datos </p>
        <p> {JSON.stringify(dataUser)} </p>
        </section>

        {/* <section className="flex flex-row gap-2">
        <p>Servicios </p>
        <p> {JSON.stringify(listServices)} </p>
        </section> */}

        {/* <section className="flex flex-row gap-2">
        <p>Transactions </p>
        <p> {JSON.stringify(transactionsList)} </p>
        </section> */}

        <section className="flex flex-row gap-2">
        <p> Transferences </p>
        <p> {JSON.stringify(transferencesList)} </p>
        </section>

        {/* <section className="flex flex-row gap-2">
        <p>Cards </p>
        <p> {JSON.stringify(cardsList)} </p>
        </section> */}
      
      
    </div>
  )
}

export default HomePage