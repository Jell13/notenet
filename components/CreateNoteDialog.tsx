import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { Plus } from 'lucide-react'

type Props = {}

const CreateNoteDialog = (props: Props) => {
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
                
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog