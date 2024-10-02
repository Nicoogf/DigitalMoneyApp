// 'use client'
// import { useTransaction } from "@/context/TransactionsContext";
// import { useAuth } from "@/context/UserContext";
// import { useEffect, useState } from "react";


// const MovementDetail = () => {

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
//         loadingTransactions,
//         movementSelected
//     } = useTransaction();
    

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

//     console.log(combinedActivityList)

//     return (
//         <div className='p-8 mt-8 bg-white w-[90%] mx-auto max-w-[720px] shadow-md rounded-lg'>
//            <p className="text-black"> {movementSelected}</p>
           
//         </div>
//     );
// };

// export default MovementDetail ;

'use client'
import { useTransaction } from "@/context/TransactionsContext";  // <- Asegúrate de importar correctamente
import { useAuth } from "@/context/UserContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const MovementDetail = () => {
    const [arrowAnimation, setArrowAnimation] = useState(false);
    const [combinedActivityList, setCombinedActivityList] = useState([]);

    const {
        credentialsUser
    } = useAuth();

    const {
        transactionsList,
        transferencesList,
        getListTransferences,  // <- Aquí obtienes correctamente esta función desde useTransaction
        getListTransactions,
        movementSelected
    } = useTransaction();

    useEffect(() => {
        if (credentialsUser && credentialsUser?.id) {
            // Estas funciones provienen de useTransaction
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

    // Buscar el movimiento que coincide con movementSelected
    const selectedMovement = combinedActivityList.find(movement => movement.id === movementSelected);

    return (
        <div className='p-8 mt-8 bg-white w-[90%] mx-auto max-w-[720px] shadow-md rounded-lg text-black'>
            {selectedMovement ? (
                <div>
                    <h2 className="text-xl font-bold mb-4">Detalles del Movimiento</h2>
                    <p><strong>Descripción:</strong> {selectedMovement.description}</p>
                    <p><strong>Monto:</strong> {selectedMovement.amount}</p>
                    <p><strong>Fecha:</strong> {new Date(selectedMovement.dated).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}</p>
                    <p><strong>Tipo:</strong> {selectedMovement.type}</p>
                </div>
            ) : (
                <p>Movimiento no encontrado.</p>
            )}

            <Link href={"/dashboard/activity"} className="bg-greenlime font-semibold px-8 py-3 rounded-lg block mt-10 w-[90%] max-w-[250px] text-center"> Volver al Listado </Link>
        </div>
    );
};

export default MovementDetail;
