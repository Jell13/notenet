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

    const noteLength = useQuery(api.documents.getLength)
    const notes = useQuery(api.documents.getNoteBook)

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

            <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                <CreateNoteDialog/>
                {noteLength === 0 ? (
                    <div>
                        You have no notes
                    </div>
                ): null}
            </div>
            
        </div>
    </div>
  )
}

export default Dashboard