'use client'
import { useAuth } from '@/context/UserContext'
import React from 'react'

const LayoutPage = ({children}) => {


  return (
    <div className="text-white">
        {children}
       
    </div>
  )
}

export default LayoutPage