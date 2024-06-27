'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useState } from 'react';
import { Bold, Heading1, Heading2, Italic, Strikethrough } from 'lucide-react';

interface EditorProps{
  content: string;
  onChange: (content: string) => void;
}

const Tiptap = ({content, onChange} : EditorProps) => {


  const[text, setText] = useState(content)

  const handleClick = () => {
    onChange(text)
  }
  const editor = useEditor({
    extensions: [
      StarterKit, Placeholder.configure({
        placeholder: "Write something here..."
      })
    ],
    content: text,
    // onBlur: () => {
    //   onChange(text)
    // },
    onUpdate: () => {
      setText(editor?.getHTML() || "")
    },
  })

  return (
    <>
      <div className='w-full flex justify-between mb-3'>
        {/* {editor && <TipTapMenuBar editor={editor} />} */}
          {editor && 
          <div className='flex gap-2'>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <Bold className="w-6 h-6" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <Italic className="w-6 h-6" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <Strikethrough className="w-6 h-6" />
            </button>
            <button
               onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }}
              className={editor.isActive("heading", { level: 1 }) ? 'is-active' : ''}
            >
              <Heading1/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
            >
              <Heading2 className="w-6 h-6" />
            </button>
          </div>}
        
        <button className='bg-green-600 text-white p-2 rounded-lg hover:bg-green-800 duration-300' onClick={handleClick}>Save</button>
      </div>
      <EditorContent className='editor-content' editor={editor} />
    </>
  )
}

export default Tiptap