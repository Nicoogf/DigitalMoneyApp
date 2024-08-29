'use client'
import { fetchTransactionsRequest } from '@/axios/Transactions';
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
  const [transferenceAmount, setTrnsferenceAmout] = useState(0)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [amount, setAmount] = useState(0);
  const [success, setSuccess] = useState(false);

  // Fetch Listado de transactions
  const getListTransactions = async (accountId) => {
    try {
      const res = await fetchTransactionsRequest(accountId)
      setTransactionsList(res)
    } catch (error) {
      console.log(error)
    }
  }

  //Listado de Transferencias de dinero
  const getListTransferences = async (accountId) => {
    try {
      const res = await fetchTransferencesRequest(accountId)
      setTransferencesList(res)
    } catch (error) {

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

    const depositAmount = async (accountId, depositData) => {
      try {
        const res = await createDepositRequest(accountId, depositData);
        router.push("/dashboard")
        console.log(res)
      } catch (erro) {
        console.log(error)
      }}


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

 

    return (
      <TransactionContext.Provider value={{
        loading, error, amount, success, setAmount,transferAmount,
        getListTransactions,depositAmount, transferenceAmount, setTrnsferenceAmout, getListTransferences, transferencesList, transactionsList
      }}>
        {children}
      </TransactionContext.Provider>
    );
  };
