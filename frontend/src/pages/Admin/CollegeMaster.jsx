import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createCollege } from '../../redux/slices/adminSlice';

const CollegeMaster = () => {
    const [collegeName ,setCollegeName] = useState("");
    const dispatch = useDispatch();

  return (
    <div className='bg-white p-6 rounded-xl shadow'>
        <h2 className='text-xl font-bold'>Create College</h2>
         <input  value={collegeName}
         onChange={(e) => setCollegeName(e.target.value)} placeholder='CollegeName' className="border px-3 py-2 rounded w-full mb-3"/>
         <button onClick={()=>dispatch(createCollege({collegeName}))} className='bg-green-400 text-white px-6 py-2 rounded'>Save College</button>
    </div>
  )
}

export default CollegeMaster