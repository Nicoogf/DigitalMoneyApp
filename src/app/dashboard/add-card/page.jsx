// 'use client';
// import { useCards } from '@/context/CardsContext';
// import { useAuth } from '@/context/UserContext';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import Cards from 'react-credit-cards-2';
// import 'react-credit-cards-2/dist/es/styles-compiled.css';
// import { useForm } from 'react-hook-form';


// const AddCardPage = () => {
//   const { createCard , cardErrors } = useCards();
//   const { credentialsUser } = useAuth()
//   const router = useRouter()

//   const [state, setState] = useState({
//     number: '',
//     expiry: '',
//     cvc: '',
//     name: '',
//     focus: '',
//   });

//   const { handleSubmit } = useForm();

//   const handleInputChange = (evt) => {
//     const { name, value } = evt.target;
  
   
//     if (name === 'expiry') {
//       const formattedExpiry = value.replace(/(\d{2})(\d{2})/, '$1/20$2');
//       setState((prev) => ({ ...prev, [name]: formattedExpiry }));
//     } else {
//       setState((prev) => ({ ...prev, [name]: value }));
//     }
//   }

//   const handleInputFocus = (evt) => {
//     setState((prev) => ({ ...prev, focus: evt.target.name }));
//   };

//   const formCardSubmit = handleSubmit(async () => {
//     const cardData = {
//       number_id: parseInt(state.number, 10),
//       expiration_date: state.expiry,  
//       cod: parseInt(state.cvc, 10),
//       first_last_name: state.name,
//     };
  
//     try {
//       const accountId = credentialsUser?.id; 
//       await createCard(accountId, cardData);      
//     } catch (error) {
//       console.error('Error creating card:', error);
//     }
//   });



//   return (
//     <main>
     
    
//       <section className='mt-20 w-[90%] mx-auto max-w-[720px] bg-white rounded-xl shadow-md p-8 text-black'>
//         <Cards
//           number={state.number}
//           expiry={state.expiry}
//           cvc={state.cvc}
//           name={state.name}
//           focused={state.focus}
//         />
//         <form className='grid grid-cols-4 gap-4 mt-8' onSubmit={formCardSubmit}>
//           <input
//             type="text"
//             maxLength={16}
//             name="number"
//             placeholder="Card Number"
//             value={state.number}
//             onChange={handleInputChange}
//             onFocus={handleInputFocus}
//             className='col-span-4 lg:col-span-2 py-2 px-4 border border-gray-400 rounded-lg shadow-md outline-none'
//           />
//           <input
//             type="text"
//             maxLength={5}
//             name="expiry"
//             placeholder="MM/AAAA"
//             value={state.expiry}
//             onChange={handleInputChange}
//             onFocus={handleInputFocus}
//             className='col-span-4 lg:col-span-2 py-2 px-4 border border-gray-400 rounded-lg shadow-md outline-none'            
//           />
//           <input
//             type="text"
//             name="cvc"
//             maxLength={3}
//             placeholder="Codigo de Seguridad"
//             value={state.cvc}
//             onChange={handleInputChange}
//             onFocus={handleInputFocus}
//             className='col-span-4 lg:col-span-2 py-2 px-4 border border-gray-400 rounded-lg shadow-md outline-none'
//           />
//           <input
//             type="text"
//             name="name"
//             maxLength={21}
//             placeholder="Nombre"
//             value={state.name}
//             onChange={handleInputChange}
//             onFocus={handleInputFocus}
//             className='col-span-4 lg:col-span-2 py-2 px-4 border border-gray-400 rounded-lg shadow-md outline-none'
//           />
//           <button className="font-semibold bg-greenlime py-3 px-8 text-center col-span-4 rounded-lg ml-auto">
//             Continuar
//           </button>
//         </form>
//       </section>
//     </main>
//   );
// };

// export default AddCardPage;



'use client';
import { useCards } from '@/context/CardsContext';
import { useAuth } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useForm } from 'react-hook-form';

const AddCardPage = () => {
  const { createCard, cardErrors, setCardsErrors } = useCards();
  const { credentialsUser } = useAuth();
  const router = useRouter();

  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const { handleSubmit } = useForm();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === 'expiry') {
      const formattedExpiry = value.replace(/(\d{2})(\d{2})/, '$1/20$2');
      setState((prev) => ({ ...prev, [name]: formattedExpiry }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const formCardSubmit = handleSubmit(async () => {
    const cardData = {
      number_id: parseInt(state.number, 10),
      expiration_date: state.expiry,
      cod: parseInt(state.cvc, 10),
      first_last_name: state.name,
    };

    try {
      const accountId = credentialsUser?.id;
      await createCard(accountId, cardData);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  });

  // Limpiar el mensaje de error después de 3 segundos
  useEffect(() => {
    if (cardErrors) {
      const timer = setTimeout(() => {
        setCardsErrors(null);
      }, 3000);
      return () => clearTimeout(timer); // Limpiar el temporizador si se desmonta el componente
    }
  }, [cardErrors, setCardsErrors]);

  return (
    <main>
      <section className='mt-20 w-[90%] mx-auto max-w-[720px] bg-white rounded-xl shadow-md p-8 text-black'>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <form className='grid grid-cols-4 gap-4 mt-8' onSubmit={formCardSubmit}>
          <input
            type="text"
            maxLength={16}
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className='col-span-4 lg:col-span-2 py-2 px-4 border border-gray-400 rounded-lg shadow-md outline-none'
          />
          <input
            type="text"
            maxLength={5}
            name="expiry"
            placeholder="MM/AAAA"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className='col-span-4 lg:col-span-2 py-2 px-4 border border-gray-400 rounded-lg shadow-md outline-none'            
          />
          <input
            type="text"
            name="cvc"
            maxLength={3}
            placeholder="Codigo de Seguridad"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className='col-span-4 lg:col-span-2 py-2 px-4 border border-gray-400 rounded-lg shadow-md outline-none'
          />
          <input
            type="text"
            name="name"
            maxLength={21}
            placeholder="Nombre"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className='col-span-4 lg:col-span-2 py-2 px-4 border border-gray-400 rounded-lg shadow-md outline-none'
          />
          <button className="font-semibold bg-greenlime py-3 px-8 text-center col-span-4 rounded-lg ml-auto">
            Continuar
          </button>
        </form>

        
        {cardErrors && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
            {cardErrors.error}
          </div>
        )}
      </section>
    </main>
  );
};

export default AddCardPage;