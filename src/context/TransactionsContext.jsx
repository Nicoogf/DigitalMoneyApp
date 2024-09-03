'use client'
import { fetchTransactionsRequest, sendTransactionRequest } from '@/axios/Transactions';
import { createDepositRequest, createTransferenceRequest, fetchTransferencesRequest } from '@/axios/Transferences';
import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './UserContext';
import { useRouter } from 'next/navigation';


const TransactionContext = createContext();

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("El TransactionContext debe ser utilizado dentro del TransactionProvider");
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const router = useRouter()
  const { credentialsUser } = useAuth()
  const [transactionsList, setTransactionsList] = useState([]);
  const [transferencesList, setTransferencesList] = useState([])
  const [transferenceAmount, setTransferenceAmout] = useState(0)

  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [error, setError] = useState(null);

  const [amount, setAmount] = useState(0);
  const [success, setSuccess] = useState(false);

  // Fetch Listado de transactions
  const getListTransactions = async (accountId) => {
    setLoadingTransactions(true)
    try {
      const res = await fetchTransactionsRequest(accountId)
      setTransactionsList(res)
      setLoadingTransactions(false)
    } catch (error) {
      console.log(error)
      setLoadingTransactions(false)
    }finally{
      setLoadingTransactions(false)
    }
  }

  //Listado de Transferencias de dinero
  const getListTransferences = async (accountId) => {
    setLoadingTransactions(true)
    try {
      const res = await fetchTransferencesRequest(accountId)
      setTransferencesList(res)
      setLoadingTransactions(false)
    } catch (error) {
      setLoadingTransactions(false)
    }finally{
      setLoadingTransactions(false)
    }
  }


  //Depositar dinero
  //   const depositAmount = async (accountId, depositData) => {
  //     setLoading(true);
  //     try {
  //         await createDepositRequest(accountId, depositData);
  //         setSuccess(true);
  //         setError(null);
  //     } catch (err) {
  //         setError(JSON.stringify(err));
  //         setSuccess(false);
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  // const depositAmount = async (accountId, depositData) => {
  //   try {
  //     const res = await createDepositRequest(accountId, depositData);
  //     router.push("/dashboard")
  //     console.log(res)
  //   } catch (erro) {
  //     console.log(error)
  //   }
  // }

  const depositAmount = async (accountId, depositData) => {
    setLoading(true);
    setError(null);
    setSuccess(false); // Reset success state before attempting deposit
  
    try {
      const res = await createDepositRequest(accountId, depositData);
      setSuccess(true); // Set success to true if the deposit was successful
      router.push("/dashboard");
      console.log(res);
    } catch (error) {
      setError('Hubo un problema al procesar la transacción.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  const transferAmount = async (accountId, transferenceData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createTransferenceRequest(accountId, transferenceData);
      console.log(res)
      setSuccess(true);
    } catch (error) {
      console.log(error)
    }
  };

  // const payService = async(user_id) => {
  //   try {
  //     const res = await sendTransactionRequest(user_id)
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const payService = async (user_id, service) => {
    try {
      const res = await sendTransactionRequest(
        user_id,
        service.invoice_value,  // Monto a pagar
        new Date().toISOString(),  // Fecha actual
        `Pago de servicio: ${service.name}`  // Descripción
      );
      console.log("Respuesta de la transacción:", res);
    } catch (error) {
      console.log("Error en payService:", error);
    }
  };



  return (
    <TransactionContext.Provider value={{
      payService,
      loadingTransactions, error, amount, success, setAmount, transferAmount,
      getListTransactions, depositAmount, transferenceAmount, setTrnsferenceAmout: setTransferenceAmout, getListTransferences, transferencesList, transactionsList
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
