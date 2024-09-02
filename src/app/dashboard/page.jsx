// 'use client'
// import { useCards } from '@/context/CardsContext'
// import { useServices } from '@/context/ServiceContext'
// import { useTransaction } from '@/context/TransactionsContext'
// import { useAuth } from '@/context/UserContext'
// import { formatCurrency, formatDate } from '@/funcionalidad/funcionalidades'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import { CopyToClipboard } from 'react-copy-to-clipboard'
// import { MdOutlineContentCopy } from "react-icons/md";
// import { FaArrowRight } from "react-icons/fa";


// const HomePage = () => {
//   const {
//     credentialsUser,  // id id_user amount cvu alias
//     dataUser, // name lastname dni email
//     loading, // esta cargando ?
//     setLoading,
//     getDataUser // trae los datos del user
//   } = useAuth()

//   const { listServices } = useServices()
//   const { transactionsList, transferencesList, getListTransferences, getListTransactions } = useTransaction()
//   const { cardsList } = useCards()
//   const [showCVU, setShowCVU] = useState(false)
//   const [latestActivities, setLatestActivities] = useState([])
//   const [searchTerm, setSearchTerm] = useState(''); // Estado para el texto del input
//   const [filteredActivities, setFilteredActivities] = useState(latestActivities); // Estado para las actividades filtradas


//   const toggleShowMenu = () => {
//     setShowCVU(!showCVU)
//   }



//   useEffect(() => {
//     const fetchData = async () => {
//       if (credentialsUser?.user_id) {
//         await getDataUser(credentialsUser?.user_id)
//         await getListTransferences(credentialsUser?.id)
//         await getListTransactions(credentialsUser?.id)

    
//         const combinedList = [...transactionsList, ...transferencesList]

//         const sortedList = combinedList.sort((a, b) => new Date(b.dated) - new Date(a.dated))

//         const recentActivities = sortedList.slice(0, 10)

//         await setLatestActivities(recentActivities)
//       }
//       setLoading(false);
//     }
//     fetchData()
//   }, [credentialsUser])





//   return (
//     <section className="text-white flex flex-col  gap-y-4">

//       <article className="shadow-md bg-graydark rounded-md mt-20 text-white py-12 w-[95%] max-w-[720px] mx-auto flex flex-col relative overflow-hidden">


//         <CopyToClipboard text={credentialsUser?.cvu} >
//           <article onClick={toggleShowMenu} className={`cursor-pointer transition-all duration-200 font-semibold  absolute ${showCVU ? "translate-x-0" : "translate-x-[300px]"}  bottom-0 right-0 text-lime-950 bg-greenlime px-12 py-2 rounded-tl-md flex flex-row items-center`}>
//             <MdOutlineContentCopy className='mx-2 text-xl' />
//             <p> {credentialsUser?.cvu} </p>
//           </article>
//         </CopyToClipboard>

//         <div className="flex flex-row gap-x-4 justify-end mr-8">
//           <Link href="/" className="text-white transition-all duration-200 hover:text-greenlime"> Ver Tarjetas </Link>
//           <button onClick={toggleShowMenu} className="text-white transition-all duration-200 hover:text-greenlime"> Ver CVU </button>
//         </div>

//         <div className="ml-8 flex flex-col gap-y-2 pb-4 ">
//           <p className="font-semibold"> Dinero Disponible </p>
//           <p className="font-bold border-[3px] border-greenlime w-[60%] max-w-[340px] text-3xl text-center rounded-full py-2"> $ {formatCurrency(credentialsUser?.available_amount)} </p>
//         </div>
//       </article>

//       <section className='max-w-[720px] mx-auto w-[95%] flex flex-col gap-y-4 lg:flex-row lg:gap-x-4'>
//         <Link className='bg-greenlime text-graydark text-center shadow-md font-bold text-xl rounded-lg p-4 lg:w-[50%]' href="/dashboard/get-money">
//           Cargar Dinero
//         </Link>
//         <Link className='bg-greenlime text-graydark text-center font-bold text-xl rounded-lg p-4 shadow-md lg:w-[50%]' href="/dashboard/pay-services">
//           Pagar Servicios
//         </Link>
//       </section>

//      <section className="bg-white max-w-[720px] mx-auto w-[95%] rounded-lg overflow-hidden overflow-y-scroll p-4 shadow-md">

//       <h6 className="text-lg font-semibold text-black border-b-2 border-black pb-2"> Tu Actividad </h6>

//       <div className="h-[250px] flex flex-col overflow-hidden overflow-y-scroll my-2">
        
//           {latestActivities.map((activity) => (
//             <article key={activity.id} 
//             className="border-b border-gray-300 text-black py-2 flex flex-row justify-between items-center ">

//               <div className="flex flex-row gap-x-2 items-center ">
//                 <div className="w-5 h-5 rounded-full bg-greenlime"/>
//                 <p> {activity.description} </p>
//               </div>

//               <div className="flex flex-col"> 
//                 <p className="text-end font-semibold"> {formatCurrency(activity.amount)}</p>              
//                 <p className="text-xs text-end text-gray-600"> {formatDate(activity?.dated)}</p>
//               </div>
             
                 
//             </article>
//           ))}
    
//       </div>

//       <Link href="/dashboard/activity" className="text-lg font-semibold text-black flex flex-row items-center justify-between border-t-2 border-black pt-2"> 
//         <p> Ver toda tu actividad  </p>
//         <FaArrowRight/>
//       </Link>


//      </section>

//     </section>
//   )
// }

// export default HomePage

'use client'
import { useCards } from '@/context/CardsContext'
import { useServices } from '@/context/ServiceContext'
import { useTransaction } from '@/context/TransactionsContext'
import { useAuth } from '@/context/UserContext'
import { formatCurrency, formatDate } from '@/funcionalidad/funcionalidades'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { MdOutlineContentCopy } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

const HomePage = () => {
  const {
    credentialsUser,  // id id_user amount cvu alias
    dataUser, // name lastname dni email
    loading, // esta cargando ?
    setLoading,
    getDataUser, // trae los datos del user
    isLogued,
  } = useAuth()
  
  const { 
    transactionsList, 
    transferencesList, 
    getListTransferences,
    getListTransactions ,
    loadingTransactions
  } = useTransaction()

  const { cardsList } = useCards()
  const [showCVU, setShowCVU] = useState(false)
  const [combinedActivityList, setCombinedActivityList] = useState([]);



  const toggleShowMenu = () => {
    setShowCVU(!showCVU)
  }

  useEffect(() => {
    isLogued();
  }, []);

  useEffect(() => {
    if (credentialsUser && credentialsUser?.id) {
      getDataUser(credentialsUser.id);
    }
  }, [credentialsUser]);

  useEffect(() => {
    if (credentialsUser && credentialsUser?.id) {
      getListTransferences(credentialsUser.id);
      getListTransactions(credentialsUser.id);
    }
  }, [credentialsUser]);

  useEffect(() => {
    if (transferencesList.length > 0 || transactionsList.length > 0) {
      const combinedList = [...transferencesList, ...transactionsList]
        .sort((a, b) => new Date(b.dated) - new Date(a.dated))
        .slice(0, 10); 
      setCombinedActivityList(combinedList);
    }
  }, [transferencesList, transactionsList]);


  return (
    <section className="text-white flex flex-col gap-y-4">
      <article className="shadow-md bg-graydark rounded-md mt-20 text-white py-12 w-[95%] max-w-[720px] mx-auto flex flex-col relative overflow-hidden">
        <CopyToClipboard text={credentialsUser?.cvu} >
          <article onClick={ ()=>{
            toggleShowMenu()
            toast.success("CVU copiado en el Portapapeles")

            }} className={`cursor-pointer transition-all duration-200 font-semibold  absolute ${showCVU ? "translate-x-0" : "translate-x-[300px]"}  bottom-0 right-0 text-lime-950 bg-greenlime px-12 py-2 rounded-tl-md flex flex-row items-center`}>
            <MdOutlineContentCopy className='mx-2 text-xl' />
            <p> {credentialsUser?.cvu} </p>
          </article>
        </CopyToClipboard>
        <div className="flex flex-row gap-x-4 justify-end mr-8">
          <Link href="/dashboard/cards" className="text-white transition-all duration-200 hover:text-greenlime"> Ver Tarjetas </Link>
          <button onClick={toggleShowMenu} className="text-white transition-all duration-200 hover:text-greenlime"> Ver CVU </button>
        </div>
        <div className="ml-8 flex flex-col gap-y-2 pb-4 ">
          <p className="font-semibold"> Dinero Disponible </p>
          <p className="font-bold border-[3px] border-greenlime w-[60%] max-w-[340px] text-3xl text-center rounded-full py-2"> $ {formatCurrency(credentialsUser?.available_amount)} </p>
        </div>
      </article>

      <section className='max-w-[720px] mx-auto w-[95%] flex flex-col gap-y-4 lg:flex-row lg:gap-x-4'>
        <Link className='bg-greenlime text-graydark text-center shadow-md font-bold text-xl rounded-lg p-4 lg:w-[50%]' href="/dashboard/get-money">
          Cargar Dinero
        </Link>
        <Link className='bg-greenlime text-graydark text-center font-bold text-xl rounded-lg p-4 shadow-md lg:w-[50%]' href="/dashboard/pay-services">
          Pagar Servicios
        </Link>
      </section>

      <section className="bg-white max-w-[720px] mx-auto w-[95%] rounded-lg overflow-hidden overflow-y-scroll p-4 shadow-md">
        <h6 className="text-lg font-semibold text-black border-b-2 border-black pb-2"> Tu Actividad </h6>
        <div className="h-[250px] flex flex-col overflow-hidden overflow-y-scroll my-2">
          {combinedActivityList.map((activity) => (
            <article key={activity.id} className="border-b border-gray-300 text-black py-2 flex flex-row justify-between items-center">
              <div className="flex flex-row gap-x-2 items-center ">
                <div className="w-5 h-5 rounded-full bg-greenlime"/>
                <p> {activity.description} </p>
              </div>
              <div className="flex flex-col"> 
                <p className="text-end font-semibold"> {formatCurrency(activity.amount)} </p>              
                <p className="text-xs text-end text-gray-600"> {formatDate(activity.dated)} </p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/dashboard/activity" className="text-lg font-semibold text-black flex flex-row items-center justify-between border-t-2 border-black pt-2"> 
          <p> Ver toda tu actividad </p>
          <FaArrowRight />
        </Link>
      </section> 
      <Toaster />
    </section>
  )
}

export default HomePage



