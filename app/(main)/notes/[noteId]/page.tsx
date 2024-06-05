"use client"

import { useUser } from '@clerk/clerk-react'
import { Button } from '@components/ui/button'
import { api } from '@convex/_generated/api'
import { Id } from '@convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: {
    noteId: Id<"documents">
  }
}

const NotebookPage = ({params: {noteId}}: Props) => {

  const{user} = useUser()
  const getInfo = useQuery(api.documents.getNoteInfo,{
    id: noteId
  })

  return (
    <div className='min-h-screen p-8 grainy'>
      <div className='max-w-4xl mx-auto'>
        <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center'>
          <Link href={"/dashboard"}>
            <Button className='bg-green-600'>
              <ArrowLeft className='mr-1'/>
              Back
            </Button>
          </Link>
          <h3 className='text-xl ml-4 font-semibold'>{user?.fullName}</h3>
          <h4 className='ml-1 font-semibold text-gray-500'>/{getInfo?.title}</h4>
        </div>
      </div>
    </div>
  )
}

export default NotebookPage