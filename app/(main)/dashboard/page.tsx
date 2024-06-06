"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import { auth, getAuth } from '@clerk/nextjs/server'
import CreateNoteDialog from '@components/CreateNoteDialog'

import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import { api } from '@convex/_generated/api'
import { useConvexAuth, useQuery } from 'convex/react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {

    const {isAuthenticated} = useConvexAuth() 

    const notes = useQuery(api.documents.getNoteBook)
    const notesLenght = useQuery(api.documents.getNoteLength)

  return (
    <div className='min-h-screen grainy'>
        <div className='max-w-7xl mx-auto p-10'>
            <div className='h-14'/>
            <div className='flex items-center justify-between md:flex-row flex-col'>
                <div className='flex items-center'>
                    <Link href="/">
                        <Button className='bg-green-600' size="sm">
                            <ArrowLeft className='mr-1'/>
                            Back
                        </Button>
                    </Link>
                    <div className='w-4'/>
                    <h2 className='font-bold text-3xl'>My Notes</h2>
                    <div className='w-4'/>
                    <UserButton/>
                </div>
            </div>

            <div className='h-8'/>
            <Separator/>
            <div className='h-8'/>
            {notesLenght === 0 && (
                <div className='text-center flex justify-center items-center'>
                    <h2 className='text-xl text-gray-500'>You have no notes yet</h2>
                </div>
            )}

            <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                <CreateNoteDialog/>
                {notesLenght !== 0 && (notes?.map((note, index) => {
                    return(
                        <Link key={index} href={`/notes/${note._id}`}>
                            <div className='border-2 flex justify-center md:h-[200px] items-center transition rounded-lg hover:-translate-y-2 hover:shadow-lg'>
                                {note.title}
                            </div>
                        </Link>
                        
                    )
                }))}
            </div>
            
        </div>
    </div>
  )
}

export default Dashboard