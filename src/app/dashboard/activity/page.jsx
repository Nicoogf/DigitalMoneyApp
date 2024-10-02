//   'use client'

//   import { useTransaction } from '@/context/TransactionsContext';
//   import { useAuth } from '@/context/UserContext';
//   import React, { useEffect, useState } from 'react'
//   import { BsCalendar3Range } from "react-icons/bs";
//   import { FaAngleDown } from "react-icons/fa6";
//   import { IoExitOutline } from "react-icons/io5";
//   import { HiOutlineArrowsUpDown } from "react-icons/hi2";

//   const ActivityPage = () => {
//       const [ arrowAnimation , setArrowAnimation ] = useState(false)
//       const [showfilter, setShowFilter] = useState(false);
//       const {
//           credentialsUser,    //id id_user amount cvu alias
//           dataUser,   ///name lastname dni email
//           loading,   ///esta cargando ?
//           setLoading,
//           getDataUser,  ///trae los datos del user
//           isLogued,
//       } = useAuth()

//       const { 
//           transactionsList, 
//           transferencesList, 
//           getListTransferences,
//           getListTransactions ,
//           loadingTransactions
//         } = useTransaction()


//       const [combinedActivityList, setCombinedActivityList] = useState([]);
//       const [selectedPeriod, setSelectedPeriod] = useState('');
//       const [ ingresos , setIngresos ] = useState(false)
//       const [ egresos , setEgresos ] = useState(false)

//       const handleIngresosClick = () => {
//           setIngresos(!ingresos);
//           if (!ingresos) {
//               setEgresos(false);  
//           }
//       };

//       const handleEgresosClick = () => {
//           setEgresos(!egresos);
//           if (!egresos) {
//               setIngresos(false);   
//           }
//       };


//       const handlePeriodChange = (event) => {
//           setSelectedPeriod(event.target.value);
//       };

//       const handleClearFilters = () => {
//           setSelectedPeriod('');
//       };

//       const toggleArrow = () => {
//           setArrowAnimation(!arrowAnimation)
//       }

//       useEffect(() => {
//           isLogued();
//       }, []);

//       useEffect(() => {
//           if (credentialsUser && credentialsUser?.id) {
//               getDataUser(credentialsUser.id);
//           }
//       }, [credentialsUser]);

//       useEffect(() => {
//           if (credentialsUser && credentialsUser?.id) {
//               getListTransferences(credentialsUser.id);
//               getListTransactions(credentialsUser.id);
//           }
//       }, [credentialsUser]);

//       useEffect(() => {
//           if (transferencesList.length > 0 || transactionsList.length > 0) {
//               const combinedList = [...transferencesList, ...transactionsList]
//                   .sort((a, b) => new Date(b.dated) - new Date(a.dated))               
//               setCombinedActivityList(combinedList);
//           }
//       }, [transferencesList, transactionsList]);

//       const filteredTransactions = combinedActivityList.filter(transaction => {
//           if (!selectedPeriod) return true;

//           const transactionDate = new Date(transaction.dated);
//           const today = new Date();

//           switch (selectedPeriod) {
//               case 'Hoy':
//                   return transactionDate.toDateString() === today.toDateString();
//               case 'Ayer':
//                   const yesterday = new Date(today);
//                   yesterday.setDate(yesterday.getDate() - 1);
//                   return transactionDate.toDateString() === yesterday.toDateString();
//               case 'Última Semana':
//                   const lastWeek = new Date(today);
//                   lastWeek.setDate(today.getDate() - 7);
//                   return transactionDate >= lastWeek;
//               case 'Últimos 15 Días':
//                   const last15Days = new Date(today);
//                   last15Days.setDate(today.getDate() - 15);
//                   return transactionDate >= last15Days;
//               case 'Último Mes':
//                   const lastMonth = new Date(today);
//                   lastMonth.setMonth(today.getMonth() - 1);
//                   return transactionDate >= lastMonth;
//               case 'Último Año':
//                   const lastYear = new Date(today);
//                   lastYear.setFullYear(today.getFullYear() - 1);
//                   return transactionDate >= lastYear;
//               default:
//                   return true;
//           }
//       });

//       const toggleFilter = () => {
//           setShowFilter(!showfilter);
//           console.log(showfilter);
//       };


//       console.log("La lista de resultados es :" , filteredTransactions)
//       return (
//           <main className='relative text-black'>
//               <section className='text-black mt-20 w-[90%] mx-auto max-w-[720px] flex flex-row gap-x-4'>
//                   <input placeholder="Buscar en tu actividad" className='outline-none px-4 bg-white rounded-lg shadow-md block w-[80%]' />
//                   <button onClick={toggleFilter} className='flex flex-row items-center justify-center gap-x-4 bg-greenlime px-6 py-2 rounded-lg shadow-md w-[20%]'>
//                       <span className='font-semibold'> Filtrar </span>
//                       <BsCalendar3Range />
//                   </button>
//               </section>

//               <section className={`transition-all duration-300 w-[70%] max-w-[480px] absolute top-4 right-4 bg-gray-200 p-4 rounded-xl border-2 border-gray-500 py-8 ${!showfilter ? " translate-x-[1000px] opacity-0" : "translate-x-0 opacity-100"} z-50`}>
//                   <div className='flex flex-row items-center justify-between px-4 border-b border-gray-400 my-4'>
//                       <IoExitOutline className='absolute top-4 right-4 text-4xl cursor-pointer' onClick={toggleFilter} />
//                       <h6 className='flex flex-row items-center gap-x-4 py-2 font-semibold'>
//                           <span> Periodo </span>
//                           <FaAngleDown />
//                       </h6>
//                       <h6 className='font-semibold cursor-pointer' onClick={handleClearFilters}> Borrar filtros </h6>
//                   </div>

//                   <div>
//                       <div className="flex flex-row items-center justify-between py-4">
//                           <label className="font-bold">Hoy</label>
//                           <input type="radio" name="periodo" value="Hoy" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Hoy'} />
//                       </div>
//                       <div className="flex flex-row items-center justify-between py-4">
//                           <label className="font-bold">Ayer</label>
//                           <input type="radio" name="periodo" value="Ayer" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Ayer'} />
//                       </div>
//                       <div className="flex flex-row items-center justify-between py-4">
//                           <label className="font-bold">Última Semana</label>
//                           <input type="radio" name="periodo" value="Última Semana" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Última Semana'} />
//                       </div>
//                       <div className="flex flex-row items-center justify-between py-4">
//                           <label className="font-bold">Últimos 15 Días</label>
//                           <input type="radio" name="periodo" value="Últimos 15 Días" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Últimos 15 Días'} />
//                       </div>
//                       <div className="flex flex-row items-center justify-between py-4">
//                           <label className="font-bold">Último Mes</label>
//                           <input type="radio" name="periodo" value="Último Mes" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Último Mes'} />
//                       </div>
//                       <div className="flex flex-row items-center justify-between py-4">
//                           <label className="font-bold">Último Año</label>
//                           <input type="radio" name="periodo" value="Último Año" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Último Año'} />
//                       </div>
//                   </div>
//               </section>

//               <section className='p-8 mt-8 bg-white w-[90%] mx-auto max-w-[720px] shadow-md rounded-lg relative'>
//                   <button onClick={toggleArrow}
//                   className={`transition-all duration-300 ${arrowAnimation ? "bg-greenlime text-graydark rotate-180" : "bg-graydark text-greenlime"}  p-2 absolute top-2 right-2 rounded-full`}> 
//                       <HiOutlineArrowsUpDown /> 
//                   </button>
//                   <div className="flex flex-row items-center justify-between">

//                   <h6 className='text-lg font-semibold border-b border-gray-400 py-4'> Tu actividad </h6>

//                   <div className="flex flex-row gap-x-4 mr-10">
//                       <button className={` transition-all duration-200 border ${ ingresos ? "border-black text-gray-900 bg-greenlime " : "border-gray-400 text-gray-900 bg-gray-100"}   rounded-md py-1 px-3  `} onClick={handleIngresosClick}> Ingresos </button>
//                       <button className={` transition-all duration-200 border ${ egresos ? "border-black text-gray-900 bg-greenlime " : "border-gray-400 text-gray-900 bg-gray-100"}   rounded-md py-1 px-3  `} onClick={handleEgresosClick}> Egresos  </button>
//                   </div>
//                   </div>


//                   <section className='relative bg-white h-[400px] max-w-[980px] mx-auto w-[90%] mt-4 rounded-xl p-4 flex flex-col justify-between overflow-hidden overflow-y-scroll pb-8'>

//                       {filteredTransactions.length === 0 && !loading ? (
//                           <p>No se encontraron transacciones.</p>
//                       ) : (
//                           <ul>
//                               {filteredTransactions.map((transaction , index) => (
//                                   <li key={`${transaction.id}-${index}`} className='border-b border-gray-300 py-2 flex flex-row justify-between px-2 items-center'>
//                                       <div className='flex flex-row gap-x-4'>
//                                           <div className='bg-greenlime h-5 w-5 rounded-full' />
//                                           <p>{transaction.description}</p>
//                                       </div>
//                                       <div className='flex flex-col'>
//                                           <p className='text-end'> $ {transaction.amount} </p>
//                                           <p className='text-end text-xs text-gray-400'> {new Date(transaction.dated).toLocaleDateString('es-AR')}</p>
//                                       </div>
//                                   </li>
//                               ))}
//                           </ul>
//                       )}
//                   </section>
//               </section>
//           </main>
//       )
//   }

//   export default ActivityPage;


// 'use client'

// import { useTransaction } from '@/context/TransactionsContext';
// import { useAuth } from '@/context/UserContext';
// import React, { useEffect, useState } from 'react'
// import { BsCalendar3Range } from "react-icons/bs";
// import { FaAngleDown } from "react-icons/fa6";
// import { IoExitOutline } from "react-icons/io5";
// import { HiOutlineArrowsUpDown } from "react-icons/hi2";

// const ActivityPage = () => {
//     const [arrowAnimation, setArrowAnimation] = useState(false);
//     const [showFilter, setShowFilter] = useState(false);
//     const [combinedActivityList, setCombinedActivityList] = useState([]);
//     const [selectedPeriod, setSelectedPeriod] = useState('');
//     const [ingresos, setIngresos] = useState(false);
//     const [egresos, setEgresos] = useState(false);
//     const [searchQuery, setSearchQuery] = useState(''); 

//     const {
//         credentialsUser,  
//         dataUser, 
//         loading, 
//         setLoading,
//         getDataUser, 
//         isLogued,
//     } = useAuth();

//     const { 
//         transactionsList, 
//         transferencesList, 
//         getListTransferences,
//         getListTransactions,
//         loadingTransactions 
//     } = useTransaction();

//     const handleIngresosClick = () => {
//         setIngresos(!ingresos);
//         if (!ingresos) {
//             setEgresos(false);
//         }
//     };

//     const handleEgresosClick = () => {
//         setEgresos(!egresos);
//         if (!egresos) {
//             setIngresos(false);
//         }
//     };

//     const handlePeriodChange = (event) => {
//         setSelectedPeriod(event.target.value);
//     };

//     const handleClearFilters = () => {
//         setSelectedPeriod('');
//         setSearchQuery(''); 
//     };

//     const toggleArrow = () => {
//         setArrowAnimation(!arrowAnimation);
//     }

//     useEffect(() => {
//         isLogued();
//     }, []);

//     useEffect(() => {
//         if (credentialsUser && credentialsUser?.id) {
//             getDataUser(credentialsUser.id);
//         }
//     }, [credentialsUser]);

//     useEffect(() => {
//         if (credentialsUser && credentialsUser?.id) {
//             getListTransferences(credentialsUser.id);
//             getListTransactions(credentialsUser.id);
//         }
//     }, [credentialsUser]);

//     useEffect(() => {
//         if (transferencesList.length > 0 || transactionsList.length > 0) {
//             const combinedList = [...transferencesList, ...transactionsList];
//             combinedList.sort((a, b) => arrowAnimation
//                 ? new Date(a.dated) - new Date(b.dated) // Del más viejo al más nuevo
//                 : new Date(b.dated) - new Date(a.dated) // Del más nuevo al más viejo
//             );
//             setCombinedActivityList(combinedList);
//         }
//     }, [transferencesList, transactionsList, arrowAnimation]);

//     const filteredTransactions = combinedActivityList.filter(transaction => {
//         if (!selectedPeriod) return true;

//         const transactionDate = new Date(transaction.dated);
//         const today = new Date();

//         switch (selectedPeriod) {
//             case 'Hoy':
//                 return transactionDate.toDateString() === today.toDateString();
//             case 'Ayer':
//                 const yesterday = new Date(today);
//                 yesterday.setDate(yesterday.getDate() - 1);
//                 return transactionDate.toDateString() === yesterday.toDateString();
//             case 'Última Semana':
//                 const lastWeek = new Date(today);
//                 lastWeek.setDate(today.getDate() - 7);
//                 return transactionDate >= lastWeek;
//             case 'Últimos 15 Días':
//                 const last15Days = new Date(today);
//                 last15Days.setDate(today.getDate() - 15);
//                 return transactionDate >= last15Days;
//             case 'Último Mes':
//                 const lastMonth = new Date(today);
//                 lastMonth.setMonth(today.getMonth() - 1);
//                 return transactionDate >= lastMonth;
//             case 'Último Año':
//                 const lastYear = new Date(today);
//                 lastYear.setFullYear(today.getFullYear() - 1);
//                 return transactionDate >= lastYear;
//             default:
//                 return true;
//         }
//     }).filter(transaction => {
//         if (ingresos) {
//             return transaction.type === 'Deposit';
//         }
//         if (egresos) {
//             return transaction.type === 'Transfer' || transaction.type === 'Transaction';
//         }
//         return true;
//     }).filter(transaction => {
//         return transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
//     });

//     const toggleFilter = () => {
//         setShowFilter(!showFilter);
//     };

//     return (
//         <main className='relative text-black'>
//             <section className='text-black mt-8 w-[90%] mx-auto max-w-[720px] flex flex-row gap-x-4'>
//                 <input 
//                     placeholder="Buscar en tu actividad" 
//                     className='outline-none px-4 bg-white rounded-lg shadow-md block w-[80%]' 
//                     value={searchQuery} 
//                     onChange={(e) => setSearchQuery(e.target.value)} 
//                 />
//                 <button onClick={toggleFilter} className='text-center flex flex-row items-center justify-center gap-x-4 bg-greenlime px-6 py-2 rounded-lg shadow-md w-[20%]'>
//                     <span className='font-semibold text-center'> Filtrar </span>
//                     <BsCalendar3Range />
//                 </button>
//             </section>

//             <section className={`transition-all duration-300 w-[70%] max-w-[480px] absolute top-4 right-4 bg-gray-200 p-4 rounded-xl border-2 border-gray-500 py-8 ${!showFilter ? " translate-x-[1000px] opacity-0" : "translate-x-0 opacity-100"} z-50`}>
//                 <div className='flex flex-row items-center justify-between px-4 border-b border-gray-400 my-4'>
//                     <IoExitOutline className='absolute top-4 right-4 text-4xl cursor-pointer' onClick={toggleFilter} />
//                     <h6 className='flex flex-row items-center gap-x-4 py-2 font-semibold'>
//                         <span> Periodo </span>
//                         <FaAngleDown />
//                     </h6>
//                     <h6 className='font-semibold cursor-pointer' onClick={handleClearFilters}> Borrar filtros </h6>
//                 </div>

//                 <div>
//                     <div className="flex flex-row items-center justify-between py-4">
//                         <label className="font-bold">Hoy</label>
//                         <input type="radio" name="periodo" value="Hoy" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Hoy'} />
//                     </div>
//                     <div className="flex flex-row items-center justify-between py-4">
//                         <label className="font-bold">Ayer</label>
//                         <input type="radio" name="periodo" value="Ayer" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Ayer'} />
//                     </div>
//                     <div className="flex flex-row items-center justify-between py-4">
//                         <label className="font-bold">Última Semana</label>
//                         <input type="radio" name="periodo" value="Última Semana" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Última Semana'} />
//                     </div>
//                     <div className="flex flex-row items-center justify-between py-4">
//                         <label className="font-bold">Últimos 15 Días</label>
//                         <input type="radio" name="periodo" value="Últimos 15 Días" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Últimos 15 Días'} />
//                     </div>
//                     <div className="flex flex-row items-center justify-between py-4">
//                         <label className="font-bold">Último Mes</label>
//                         <input type="radio" name="periodo" value="Último Mes" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Último Mes'} />
//                     </div>
//                     <div className="flex flex-row items-center justify-between py-4">
//                         <label className="font-bold">Último Año</label>
//                         <input type="radio" name="periodo" value="Último Año" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Último Año'} />
//                     </div>
//                 </div>
//             </section>

//             <section className='p-8 mt-8 bg-white w-[90%] mx-auto max-w-[720px] shadow-md rounded-lg relative'>
//                 <div className=" absolute top-4 right-4 flex flex-row items-center gap-x-3">
//                 <button className={`transition-all duration-200 border ${ingresos ? "border-black text-gray-950 bg-greenlime " : "border-gray-950 bg-gray-950 text-greenlime"} py-1 px-3 rounded-lg`} onClick={handleIngresosClick}>
//                             Ingresos
//                         </button>
//                         <button className={`transition-all duration-200 border ${egresos ? "border-black text-gray-950 bg-greenlime " : "border-gray-950 bg-gray-950 text-greenlime"} py-1 px-3 rounded-lg`} onClick={handleEgresosClick}>
//                             Egresos
//                         </button>
//                 <button onClick={toggleArrow}
//                     className={`transition-all duration-300 ${arrowAnimation ? "bg-greenlime text-graydark rotate-180" : "bg-graydark text-greenlime"} rounded-full shadow-md mx-4  w-8 h-8 flex items-center justify-center`}>
//                     <HiOutlineArrowsUpDown className='text-lg rounded-full' />
//                 </button>

//                 </div>


//                 <div className="flex flex-row items-center justify-between">
//                     <h6 className='text-lg font-semibold border-b border-gray-400 py-4'> Tu actividad </h6>
//                     <div className="flex flex-row gap-x-4 mr-10">

//                     </div>
//                 </div>

//                 <ul className='flex flex-col gap-y-1 mt-4 h-[250px] lg:h-[400px] overflow-hidden overflow-y-scroll'>
//                     {filteredTransactions.map((transaction, index) => (
//                         <li key={index} className="flex flex-row justify-between py-[2px] border-b border-gray-300">
//                             <div className="flex flex-row items-center gap-x-2 ">
//                                 <div className={`w-3 h-3 rounded-full ${transaction.type === "Deposit" ? "bg-greenlime" : "bg-red-400"} `}/>
//                                 <span className="text-gray-600"> {transaction.description} </span>
//                             </div>
//                             <div>
//                             <span className="flex flex-col text-end font-semibold"> ${transaction.amount } </span>
//                             <span className="text-gray-500 text-xs"> {new Date(transaction.dated).toLocaleDateString()} </span>

//                             </div>

//                         </li>
//                     ))}
//                 </ul>
//             </section>
//         </main>
//     )
// }

// export default ActivityPage;


// 'use client'

// import { useTransaction } from '@/context/TransactionsContext';
// import { useAuth } from '@/context/UserContext';
// import React, { useEffect, useState } from 'react'
// import { BsCalendar3Range } from "react-icons/bs";
// import { FaAngleDown } from "react-icons/fa6";
// import { IoExitOutline } from "react-icons/io5";
// import { HiOutlineArrowsUpDown } from "react-icons/hi2";

// const ActivityPage = () => {
//     const [arrowAnimation, setArrowAnimation] = useState(false);
//     const [showFilter, setShowFilter] = useState(false);
//     const [combinedActivityList, setCombinedActivityList] = useState([]);
//     const [selectedPeriod, setSelectedPeriod] = useState('');
//     const [ingresos, setIngresos] = useState(false);
//     const [egresos, setEgresos] = useState(false);
//     const [searchQuery, setSearchQuery] = useState(''); 

//     // Paginación
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     const {
//         credentialsUser,  
//         dataUser, 
//         loading, 
//         setLoading,
//         getDataUser, 
//         isLogued,
//     } = useAuth();

//     const { 
//         transactionsList, 
//         transferencesList, 
//         getListTransferences,
//         getListTransactions,
//         loadingTransactions 
//     } = useTransaction();

//     const handleIngresosClick = () => {
//         setIngresos(!ingresos);
//         if (!ingresos) {
//             setEgresos(false);
//         }
//     };

//     const handleEgresosClick = () => {
//         setEgresos(!egresos);
//         if (!egresos) {
//             setIngresos(false);
//         }
//     };

//     const handlePeriodChange = (event) => {
//         setSelectedPeriod(event.target.value);
//     };

//     const handleClearFilters = () => {
//         setSelectedPeriod('');
//         setSearchQuery(''); 
//     };

//     const toggleArrow = () => {
//         setArrowAnimation(!arrowAnimation);
//     }

//     useEffect(() => {
//         isLogued();
//     }, []);

//     useEffect(() => {
//         if (credentialsUser && credentialsUser?.id) {
//             getDataUser(credentialsUser.id);
//         }
//     }, [credentialsUser]);

//     useEffect(() => {
//         if (credentialsUser && credentialsUser?.id) {
//             getListTransferences(credentialsUser.id);
//             getListTransactions(credentialsUser.id);
//         }
//     }, [credentialsUser]);

//     useEffect(() => {
//         if (transferencesList.length > 0 || transactionsList.length > 0) {
//             const combinedList = [...transferencesList, ...transactionsList];
//             combinedList.sort((a, b) => arrowAnimation
//                 ? new Date(a.dated) - new Date(b.dated) 
//                 : new Date(b.dated) - new Date(a.dated) 
//             );
//             setCombinedActivityList(combinedList);
//         }
//     }, [transferencesList, transactionsList, arrowAnimation]);

//     const filteredTransactions = combinedActivityList.filter(transaction => {
//         if (!selectedPeriod) return true;

//         const transactionDate = new Date(transaction.dated);
//         const today = new Date();

//         switch (selectedPeriod) {
//             case 'Hoy':
//                 return transactionDate.toDateString() === today.toDateString();
//             case 'Ayer':
//                 const yesterday = new Date(today);
//                 yesterday.setDate(yesterday.getDate() - 1);
//                 return transactionDate.toDateString() === yesterday.toDateString();
//             case 'Última Semana':
//                 const lastWeek = new Date(today);
//                 lastWeek.setDate(today.getDate() - 7);
//                 return transactionDate >= lastWeek;
//             case 'Últimos 15 Días':
//                 const last15Days = new Date(today);
//                 last15Days.setDate(today.getDate() - 15);
//                 return transactionDate >= last15Days;
//             case 'Último Mes':
//                 const lastMonth = new Date(today);
//                 lastMonth.setMonth(today.getMonth() - 1);
//                 return transactionDate >= lastMonth;
//             case 'Último Año':
//                 const lastYear = new Date(today);
//                 lastYear.setFullYear(today.getFullYear() - 1);
//                 return transactionDate >= lastYear;
//             default:
//                 return true;
//         }
//     }).filter(transaction => {
//         if (ingresos) {
//             return transaction.type === 'Deposit';
//         }
//         if (egresos) {
//             return transaction.type === 'Transfer' || transaction.type === 'Transaction';
//         }
//         return true;
//     }).filter(transaction => {
//         return transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
//     });

//     // Lógica de paginación
//     const totalItems = filteredTransactions.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const toggleFilter = () => {
//         setShowFilter(!showFilter);
//     };

//     return (
//         <main className='relative text-black'>
//             <section className='text-black mt-8 w-[90%] mx-auto max-w-[720px] flex flex-row gap-x-4'>
//                 <input 
//                     placeholder="Buscar en tu actividad" 
//                     className='outline-none px-4 bg-white rounded-lg shadow-md block w-[80%]' 
//                     value={searchQuery} 
//                     onChange={(e) => setSearchQuery(e.target.value)} 
//                 />
//                 <button onClick={toggleFilter} className='text-center flex flex-row items-center justify-center gap-x-2 bg-greenlime px-6 py-2 rounded-lg shadow-md w-[20%]'>
//                     <h6 className='font-semibold text-center text-sm'> Filtrar </h6>
//                     <BsCalendar3Range className='hidden lg:flex' />
//                 </button>
//             </section>

//             <section className={`transition-all duration-300 w-[70%] max-w-[480px] absolute top-4 right-4 bg-gray-100 p-4 border-2 border-gray-300 pb-4 ${!showFilter ? " translate-x-[1000px] opacity-0" : "translate-x-0 opacity-100"} z-50`}>
//                 <div className='flex flex-row items-center justify-between px-4 border-b border-gray-400 my-1'>

//                     <h6 className='flex flex-row items-center gap-x-4 py-2 font-semibold'>
//                         <span> Periodo </span>
//                         <FaAngleDown />
//                     </h6>
//                     <h6 className='font-semibold cursor-pointer' onClick={handleClearFilters}> Borrar filtros </h6>
//                 </div>

//                 <div>

//                     {['Hoy', 'Ayer', 'Última Semana', 'Últimos 15 Días', 'Último Mes', 'Último Año'].map((period) => (
//                         <div className="flex flex-row items-center justify-between py-4" key={period}>
//                             <label className="font-bold">{period}</label>
//                             <input type="radio" name="periodo" value={period} className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === period} />
//                         </div>
//                     ))}
//                 </div>

//                 <button className='cursor-pointer bg-greenlime font-semibold w-full py-2 rounded-md shadow-md' onClick={toggleFilter}> Cerrar </button>
//             </section>






//             <section className='p-8 mt-8 bg-white w-[90%] mx-auto max-w-[720px] shadow-md rounded-lg relative'>
//                 <div className=" absolute top-4 right-4 flex flex-row items-center gap-x-3">
//                     <button className={`transition-all duration-200 border ${ingresos ? "border-black text-gray-950 bg-greenlime " : "border-gray-950 bg-gray-950 text-greenlime"} py-1 px-3 rounded-lg`} onClick={handleIngresosClick}>
//                         Ingresos
//                     </button>
//                     <button className={`transition-all duration-200 border ${egresos ? "border-black text-gray-950 bg-greenlime " : "border-gray-950 bg-gray-950 text-greenlime"} py-1 px-3 rounded-lg`} onClick={handleEgresosClick}>
//                         Egresos
//                     </button>
//                     <button onClick={toggleArrow}
//                         className={`transition-all duration-300 ${arrowAnimation ? "bg-greenlime text-graydark rotate-180" : "bg-graydark text-greenlime"} rounded-full shadow-md mx-4  w-8 h-8 flex items-center justify-center`}>
//                         <HiOutlineArrowsUpDown className='text-lg rounded-full' />
//                     </button>
//                 </div>

//                 <div className="flex flex-row items-center justify-between">
//                     <h6 className='text-lg font-semibold border-b border-gray-400 pt-4 pb-1'> Tu actividad </h6>
//                 </div>

//                 <ul className='flex flex-col gap-y-1 mt-2 h-[250px] lg:h-[400px] overflow-hidden overflow-y-scroll'>
//                     {paginatedTransactions.map((transaction, index) => (
//                         <li key={index} className="flex flex-col py-1">
//                             <div className='flex flex-row justify-between items-center gap-x-1 border-b border-gray-300'>

//                                <div className='flex flex-row items-center gap-x-2'>
//                                <div className='w-5 h-5 rounded-full bg-greenlime' />
//                                <h6 className='text-xs md:text-sm'> {transaction.description} </h6>
//                                </div>


//                                 <div>
//                                 <p className="text-xs text-right">
//                                 $ {transaction.amount} {transaction.currency}
//                                 </p>
//                                 <p className='text-[8px] text-right'>
//                                     {new Date(transaction.dated).toLocaleDateString('es-ES', {
//                                         day: 'numeric',
//                                         month: 'long',
//                                         year: 'numeric',
//                                     })}
//                                 </p>
//                                 </div>

//                             </div>

//                         </li>
//                     ))}
//                 </ul>

//                 {/* Paginación */}
//                 <div className="flex justify-center items-center mt-4">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                         <button
//                             key={page}
//                             onClick={() => handlePageChange(page)}
//                             className={`px-3 py-1 mx-1 border ${page === currentPage ? 'bg-gray-300 text-graydark font-semibold' : 'bg-transparent text-black'} rounded`}
//                         >
//                             {page}
//                         </button>
//                     ))}
//                 </div>
//             </section>
//         </main>
//     )
// }

// export default ActivityPage;





'use client'

import { useTransaction } from '@/context/TransactionsContext';
import { useAuth } from '@/context/UserContext';
import React, { useEffect, useState } from 'react'
import { BsCalendar3Range } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useRouter } from 'next/navigation';

const ActivityPage = () => {
    const [arrowAnimation, setArrowAnimation] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [combinedActivityList, setCombinedActivityList] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [ingresos, setIngresos] = useState(false);
    const [egresos, setEgresos] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

   

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {
        credentialsUser,
        dataUser,
        loading,
        setLoading,
        getDataUser,
        isLogued,
    } = useAuth();

    const {
        transactionsList,
        transferencesList,
        getListTransferences,
        getListTransactions,
        loadingTransactions,
        setMovementSelected
    } = useTransaction();

    const handleIngresosClick = () => {
        setIngresos(!ingresos);
        if (!ingresos) {
            setEgresos(false);
        }
    };

    const handleEgresosClick = () => {
        setEgresos(!egresos);
        if (!egresos) {
            setIngresos(false);
        }
    };

    const handlePeriodChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const handleClearFilters = () => {
        setSelectedPeriod('');
        setSearchQuery('');
    };

    const toggleArrow = () => {
        setArrowAnimation(!arrowAnimation);
    }

    const handleMovementClick = (transaction) => {  
        setMovementSelected(transaction.id)    
        router.push(`/dashboard/activity/${transaction.id}`);
    };


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
            const combinedList = [...transferencesList, ...transactionsList];
            combinedList.sort((a, b) => arrowAnimation
                ? new Date(a.dated) - new Date(b.dated)
                : new Date(b.dated) - new Date(a.dated)
            );
            setCombinedActivityList(combinedList);
        }
    }, [transferencesList, transactionsList, arrowAnimation]);

    const filteredTransactions = combinedActivityList.filter(transaction => {
        if (!selectedPeriod) return true;

        const transactionDate = new Date(transaction.dated);
        const today = new Date();

        switch (selectedPeriod) {
            case 'Hoy':
                return transactionDate.toDateString() === today.toDateString();
            case 'Ayer':
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                return transactionDate.toDateString() === yesterday.toDateString();
            case 'Última Semana':
                const lastWeek = new Date(today);
                lastWeek.setDate(today.getDate() - 7);
                return transactionDate >= lastWeek;
            case 'Últimos 15 Días':
                const last15Days = new Date(today);
                last15Days.setDate(today.getDate() - 15);
                return transactionDate >= last15Days;
            case 'Último Mes':
                const lastMonth = new Date(today);
                lastMonth.setMonth(today.getMonth() - 1);
                return transactionDate >= lastMonth;
            case 'Último Año':
                const lastYear = new Date(today);
                lastYear.setFullYear(today.getFullYear() - 1);
                return transactionDate >= lastYear;
            default:
                return true;
        }
    }).filter(transaction => {
        if (ingresos) {
            return transaction.type === 'Deposit';
        }
        if (egresos) {
            return transaction.type === 'Transfer' || transaction.type === 'Transaction';
        }
        return true;
    }).filter(transaction => {
        return transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Lógica de paginación
    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    return (
        <main className='relative text-black'>
            <section className='text-black mt-8 w-[90%] mx-auto max-w-[720px] flex flex-row gap-x-4'>
                <input
                    placeholder="Buscar en tu actividad"
                    className='outline-none px-4 bg-white rounded-lg shadow-md block w-[80%]'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={toggleFilter} className='text-center flex flex-row items-center justify-center gap-x-2 bg-greenlime px-6 py-2 rounded-lg shadow-md w-[20%]'>
                    <h6 className='font-semibold text-center text-sm'> Filtrar </h6>
                    <BsCalendar3Range className='hidden lg:flex' />
                </button>
            </section>

            <section className={`transition-all duration-300 w-[70%] max-w-[480px] absolute top-4 right-4 bg-gray-100 p-4 border-2 border-gray-300 pb-4 ${!showFilter ? " translate-x-[1000px] opacity-0" : "translate-x-0 opacity-100"} z-50`}>
                <div className='flex flex-row items-center justify-between px-4 border-b border-gray-400 my-1'>

                    <h6 className='flex flex-row items-center gap-x-4 py-2 font-semibold'>
                        <span> Periodo </span>
                        <FaAngleDown />
                    </h6>
                    <h6 className='font-semibold cursor-pointer' onClick={handleClearFilters}> Borrar filtros </h6>
                </div>

                <div>

                    {['Hoy', 'Ayer', 'Última Semana', 'Últimos 15 Días', 'Último Mes', 'Último Año'].map((period) => (
                        <div className="flex flex-row items-center justify-between py-4" key={period}>
                            <label className="font-bold">{period}</label>
                            <input type="radio" name="periodo" value={period} className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === period} />
                        </div>
                    ))}
                </div>

                <button className='cursor-pointer bg-greenlime font-semibold w-full py-2 rounded-md shadow-md' onClick={toggleFilter}> Cerrar </button>
            </section>






            <section className='p-8 mt-8 bg-white w-[90%] mx-auto max-w-[720px] shadow-md rounded-lg relative'>
                <div className=" absolute top-4 right-4 flex flex-row items-center gap-x-3">
                    <button className={`transition-all duration-200 border ${ingresos ? "border-black text-gray-950 bg-greenlime " : "border-gray-950 bg-gray-950 text-greenlime"} py-1 px-3 rounded-lg`} onClick={handleIngresosClick}>
                        Ingresos
                    </button>
                    <button className={`transition-all duration-200 border ${egresos ? "border-black text-gray-950 bg-greenlime " : "border-gray-950 bg-gray-950 text-greenlime"} py-1 px-3 rounded-lg`} onClick={handleEgresosClick}>
                        Egresos
                    </button>
                    <button onClick={toggleArrow}
                        className={`transition-all duration-300 ${arrowAnimation ? "bg-greenlime text-graydark rotate-180" : "bg-graydark text-greenlime"} rounded-full shadow-md mx-4  w-8 h-8 flex items-center justify-center`}>
                        <HiOutlineArrowsUpDown className='text-lg rounded-full' />
                    </button>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <h6 className='text-lg font-semibold border-b border-gray-400 pt-4 pb-1'> Tu actividad </h6>
                </div>

                <ul className='flex flex-col gap-y-1 mt-2 h-[250px] lg:h-[400px] overflow-hidden overflow-y-scroll'>
                    {paginatedTransactions.map((transaction, index) => (
                        <li
                            key={index}
                            className="flex flex-col py-1 cursor-pointer"
                            onClick={() => handleMovementClick(transaction)} // Al hacer clic, se redirige
                        >
                            <div className='flex flex-row justify-between items-center gap-x-1 border-b border-gray-300'>
                                <div className='flex flex-row items-center gap-x-2'>
                                    <div className='w-5 h-5 rounded-full bg-greenlime' />
                                    <h6 className='text-xs md:text-sm'>{transaction.description}</h6>
                                </div>

                                <div>
                                    <p className="text-xs text-right">
                                        $ {transaction.amount} {transaction.currency}
                                    </p>
                                    <p className='text-[8px] text-right'>
                                        {new Date(transaction.dated).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Paginación */}
                <div className="flex justify-center items-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 mx-1 border ${page === currentPage ? 'bg-gray-300 text-graydark font-semibold' : 'bg-transparent text-black'} rounded`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default ActivityPage;


