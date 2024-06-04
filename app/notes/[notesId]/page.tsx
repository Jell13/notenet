// pages/[noteId].tsx
"use client"

import { useParams } from "next/navigation";


const NotePage = () => {

    const params = useParams()
    console.log(params)
    const id = params.notesId
  return (
    <div className='text-black font-bold'>
        {id}
    </div>
  );
};

export default NotePage;
