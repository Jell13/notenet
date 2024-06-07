'use client'

import { api } from '@convex/_generated/api'
import { Id } from '@convex/_generated/dataModel'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useMutation, useQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'

interface EditorProps{
  id: Id<"documents">;
}

const Editor = ({id: noteId}: EditorProps) => {

  const[text, setText] = React.useState<string | null>('')

  const updateNote = useMutation(api.documents.updateContent)
  const getContent = useQuery(api.documents.getNoteContent, {id: noteId})

  useEffect(() => {
    if (getContent!== undefined && getContent!== null) {
      const content = getContent
      setText(content)
      console.log("it works")
    }
  }, [getContent])

  const editor = useEditor({
    extensions: [
      StarterKit
    ],
    content: text,
    onUpdate: ({editor}) => {
      const contentString = editor.getText()
      setText(contentString)
      updateNote({
        id: noteId, content: contentString
      })
    }
  })

  return (
    <EditorContent editor={editor}/>
  )
}

export default Editor