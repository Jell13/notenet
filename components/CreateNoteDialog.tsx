"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Plus } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { toast } from 'sonner'

type Props = {}

const CreateNoteDialog = (props: Props) => {

  const createNotebook = useMutation(api.documents.createNotebook)

  const[input, setInput] = React.useState("")
  const handleSubmit = (e :React.FormEvent) => {
    e.preventDefault()
    const create = createNotebook({
      title: input
    })

    toast.promise(create,{
      success: "New note created!",
      error: "Failed to create a new note."
    })
  }
  return (
    <Dialog>
        <DialogTrigger>
            <div className='border-2 border-dashed border-green-600 flex justify-center items-center md:flex-col flex-row p-4 rounded-lg hover:shadow-xl transition hover:-translate-y-1 h-full'>
                <Plus className='text-green-600'/>
                <h1 className='font-semibold text-green-600'>Create Note</h1>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                  New Note Book
                </DialogTitle>
                <DialogDescription>
                  You can create a new note by clicking the button below
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <Input placeholder='Name...' value={input} onChange={(e) => setInput(e.target.value)}/>
              <div className='mt-4 flex gap-2'>
                <Button type='reset' variant={"secondary"}>
                  Cancel
                </Button>
                <Button type='submit' className='bg-green-600'>
                  Create
                </Button>
              </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog