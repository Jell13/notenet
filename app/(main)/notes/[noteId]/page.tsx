import React from 'react'

type Props = {
  params: {
    noteId: string
  }
}

const NotebookPage = ({params: {noteId}}: Props) => {
  return (
    <div className='min-h-screen p-8 grainy'>
      <div className='max-w-4xl mx-auto'>
        {noteId}
      </div>
    </div>
  )
}

export default NotebookPage