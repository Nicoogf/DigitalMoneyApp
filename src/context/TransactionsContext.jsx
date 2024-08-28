'use client'
import { fetchTransactionsRequest } from '@/axios/Transactions';
import { fetchTransferencesRequest } from '@/axios/Transferences';
import { createContext, useState, useContext, useEffect } from 'react';


const TransactionContext = createContext();

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("El TransactionContext debe ser utilizado dentro del TransactionProvider");
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
    const [transactionsList, setTransactionsList] = useState([]);
    const [transferencesList , setTransferencesList ] = useState([])
  
    // Fetch Listado de transactions
    const getListTransactions = async(accountId) => {
        try {
            const res = await fetchTransactionsRequest(accountId)
            setTransactionsList(res)
        } catch (error)  {
            console.log(error)
        }
    }

    const getListTransferences = async(accountId) => {
      try {
        const res = await fetchTransferencesRequest(accountId)
        console.log("Las TRANSFERENCIAS son" , res)
        setTransferencesList(res)
      } catch (error) {
        
      }
    }

  return (
    <TransactionContext.Provider value={{ getListTransferences, transferencesList, transactionsList , getListTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
