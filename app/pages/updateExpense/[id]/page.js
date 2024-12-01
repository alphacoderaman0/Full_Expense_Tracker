"use client"
import React from 'react'
import { useState , use  } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const updateExpense = ({params}) => {
  const {id} = use(params);   
  const navigate = useRouter();
  const [form, setForm] = useState({ id,title: '', amount: '' });
    const handleUpdate = async () => {
        const updatedExpense = { ...form};
        const res =  await fetch(`/api/expenses/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedExpense),
        });
        const data = await res.json();
        if (data.success) {
          setForm({ title: '', amount: '' });
          navigate.push('/');
        }
      };
  return (
    // <div>
    //   <h1>Update Expense</h1>
    //   <form onSubmit={handleUpdate}>
    //     <input
    //       type="text"
    //       placeholder="Title"
    //       value={form.title}
    //       onChange={(e) => setForm({ ...form, title: e.target.value })}
    //     />
    //     <input
    //       type="number"
    //       placeholder="Amount"
    //       value={form.amount}
    //       onChange={(e) => setForm({ ...form, amount: e.target.value })}
    //     />
    //     <button type='submit'>Update Expense</button>
    //   </form>
    // </div>
    <div className='bg-white my-10 px-4 py-10 rounded-2xl shadow-2xl'>
    <h1 className='text-center text-3xl font-bold uppercase'>Update Expense</h1>
    <form className='flex flex-col my-5 gap-5' onSubmit={handleUpdate}>
      <div className='flex flex-col gap-2'>
        <label htmlFor="title" className='text-xl uppercase font-bold'>Title:</label>
      <input
        className='border rounded-lg px-3'
        id='title'
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="amount" className='text-xl uppercase font-bold'>Amount</label>
        <input
        className='border rounded-lg px-3'
        id='amount'
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      </div>
      
      <div className='flex justify-around'>
      <Link href={"/"} className="bg-blue-500 px-2 py-1 rounded-xl text-white">Back</Link>
      <button type="submit" className="bg-green-500 px-2 py-1 rounded-xl text-white">Update Expense</button>
      </div>
    </form>
  </div>
  )
}

export default updateExpense;