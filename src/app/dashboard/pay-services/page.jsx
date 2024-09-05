'use client'
import { useServices } from '@/context/ServiceContext';
import Link from 'next/link';
import React, { useState } from 'react';


const PayServicesPage = () => {
  const { listServices, SetSelectService ,selectedService} = useServices();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectService = (id) => {
    SetSelectService(id); 
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const filteredServices = listServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className='h-[calc(100%-112px)] overflow-y-auto text-black'>
      <section className='mt-20 w-[90%] mx-auto max-w-[720px]'>
        <input 
          placeholder='Busca entre más de 5.000 empresas' 
          className='block w-full p-2 rounded-md shadow-sm outline-none px-4'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </section>

      <section className='mt-8 w-[90%] mx-auto max-w-[720px] bg-white rounded-lg shadow-md p-8'>
        <h6 className='text-lg font-semibold'>Más recientes</h6>

        <section>
         
          {filteredServices.length === 0 ? (
            <p>No se encontraron servicios disponibles.</p>
          ) : (
            filteredServices.map(service => (
              <article key={service.id} className='py-4 flex flex-row justify-between px-4 border-b border-gray-400'>
                <div className='flex flex-row gap-x-3'>
                  <div className='bg-greenlime h-5 w-5 rounded-full'/>
                  <h6>{service.name}</h6>
                </div>
                <Link 
                 onClick={() => handleSelectService(service.id)}
                className='font-semibold' href={`/dashboard/pay-services/${service.id}`}>
                  Seleccionar
                </Link>
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
};

export default PayServicesPage;
