'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useState } from 'react';
import { Bold, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, List, ListOrdered, Strikethrough } from 'lucide-react';

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
      StarterKit
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
      <div className='w-full flex sm:flex-row justify-between mb-3 flex-col gap-3'>
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
            {/* <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
            >
              <Heading3 className="w-6 h-6" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
            >
              <Heading4 className="w-6 h-6" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
            >
              <Heading5 className="w-6 h-6" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
              className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
            >
              <Heading6 className="w-6 h-6" />
            </button> */}
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              <List className="w-6 h-6" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              <ListOrdered className="w-6 h-6" />
            </button>
          </div>}
        
        <button className='bg-green-600 text-white p-2 rounded-lg hover:bg-green-800 duration-300' onClick={handleClick}>Save</button>
      </div>
      <EditorContent className='editor-content' editor={editor} />
    </>
  )
}

export default Tiptap