import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const CourseMaster = () => {
    const dispatch = useDispatch();
    const [courseName,setCourseName] = useState("");
    const [programId ,setProgramId] = useState("");
    const [collegeId,setCollegeId] = useState("");
  return (
    <div className='bg-white p-6 rounded-xl shadow'>
        <h2 className='text-xl font-bold mb-4'>Create Course</h2>
        <input placeholder='course Name' onChange={(e) =>setCourseName(e.target.value)} className="border px-3 py-2 rounded w-full mb-3" />
        <input placeholder="Program ID" onChange={(e)=>setProgramId(e.target.value)} className="border px-3 py-2 rounded w-full mb-3" />
        <input
        placeholder="College ID"
        onChange={(e) => setCollegeId(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-3"
      />

      <button onClick={() =>dispatch(createCourse({courseName,program:{id:Number(programId)},
    college:{id:Number(collegeId)}}))} className='bg-blue-500 text-white px-6 py-2 rounded'>Save Course</button>
    </div>
  )
}

export default CourseMaster