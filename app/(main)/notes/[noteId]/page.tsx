"use client"

import { useUser } from '@clerk/clerk-react'
import Tiptap from '@components/Editor'
import Editor from '@components/Editor'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog'
import { api } from '@convex/_generated/api'
import { Id } from '@convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

type Props = {
  params: {
    noteId: Id<"documents">
  }
}

const NotebookPage = ({params: {noteId}}: Props) => {

  const{user} = useUser()
  const router = useRouter()
  const getNote = useQuery(api.documents.getNoteInfo,{id: noteId})
  const deleteNote = useMutation(api.documents.deleteNote)
  const updateNote = useMutation(api.documents.updateContent)

  const handleClick = () => {

    const deletion = deleteNote({id: noteId})
    router.push("/dashboard")
    toast.promise(deletion, {
      loading: "Deleting Note",
      success: "Note Deleted",
      error: "Note was not deleted"
    })
  }

  const onChange = async (content:string) => {
    await updateNote({
      id: noteId,
      content
    })
  }

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
          <h4 className='ml-1 font-semibold text-gray-500'>/{getNote?.title}</h4>
          <div className='ml-auto'>
            <Dialog>
              <DialogTrigger>
                <Button className='bg-red-500'>
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete <span className='text-green-600'>{getNote?.title}</span> ?
                  </DialogTitle>
                  <DialogDescription>
                    This action can not be reverted and all the content of this note will be erased
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={handleClick} className='bg-red-500'>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className='h-4'/>
        <div className='border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full'>
          {/* <Editor id={noteId}/> */}
          {getNote?.content && <Tiptap content={getNote?.content} onChange={onChange}/>}
        </div>
      </div>
    </div>
  )
}

export default NotebookPage