'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

interface EditorProps{
  onChange: (value: string) => void;
  initialContent?: string;
}

const Editor = ({onChange, initialContent}: EditorProps) => {

  const editor = useEditor({
    extensions: [
      StarterKit
    ],
    content: initialContent ? initialContent : '<p>Hello World! 🌎️</p>'
  })
  return (
    <EditorContent onChange={() => onChange} editor={editor} />
  )
}

export default Editor