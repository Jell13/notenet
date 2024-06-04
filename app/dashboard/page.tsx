import { UserButton } from '@clerk/nextjs'
import CreateNoteDialog from '@components/CreateNoteDialog'

import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
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
            <div className='text-center'>
                <h2 className='text-xl text-gray-500'>You have no notes yet</h2>
            </div>

            <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                <CreateNoteDialog/>
            </div>

        </div>
    </div>
  )
}

export default Dashboard