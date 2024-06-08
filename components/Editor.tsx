'use client'
  
import { api } from '@convex/_generated/api'
import { Id } from '@convex/_generated/dataModel'
import { useEditor, EditorContent } from '@tiptap/react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import StarterKit from '@tiptap/starter-kit'
import { useMutation, useQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'

interface EditorProps{
  id: Id<"documents">;
}

const Editor = ({id: noteId}: EditorProps) => {

  const note = useQuery(api.documents.getNoteInfo, {id: noteId})
  const updateNote = useMutation(api.documents.updateContent)

  // const [value, setValue] = useState(initialContent);
  const [value, setValue] = useState("<p>Write something here</p>");

  useEffect(() => {
    if (note?.content) {
      setValue(note?.content);
    }
  }, [note]);

  // Handle content change and update backend
  const handleChange = (content: string) => {
    setValue(content);
  };
  

  // Update backend when the editor loses focus
  const handleBlur = async () => {
    if (noteId) {
      await updateNote({
        id: noteId,
        content: value,
      });
    }
  };

  // const editor = useEditor({
  //   extensions: [
  //     StarterKit
  //   ],
  //   content: initialContent,
  //   onUpdate: ({editor}) => {
  //     const contentString = editor.getText()
  //     onChange(contentString)
  //   }
  // })
  // useEffect(() => {
  //   setValue(initialContent as string)
  // },[initialContent])


  // return (
  //   <>
  //     <EditorContent editor={editor} content={value}/>
  //   </>
  // )

  return(
    <ReactQuill
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          theme="bubble"
          className="h-full"
        />
  )
}

export default Editor

