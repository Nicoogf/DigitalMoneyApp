'use client'
import { useAuth } from '@/context/UserContext'
import React from 'react'

const LayoutPage = ({children}) => {


  return (
    <div className="text-white h-[100%] overflow-hidden overflow-y-scroll">
        {children}
       
    </div>
  )
}

export default LayoutPage