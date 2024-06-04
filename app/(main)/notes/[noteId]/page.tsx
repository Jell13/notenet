import React from 'react'

type Props = {
  params: {
    noteId: string
  }
}

const NotebookPage = ({params: {noteId}}: Props) => {
  return (
    <div className='h-screen w-screen'>

    </div>
  )
}

export default NotebookPage