'use client'
  
import { api } from '@convex/_generated/api'
import { Id } from '@convex/_generated/dataModel'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'
import useDebounceState from '@hooks/useDebounceState';

interface EditorProps{
  id: Id<"documents">;
}

const Editor = ({id: noteId}: EditorProps) => {

  const note = useQuery(api.documents.getNoteInfo, {id: noteId})
  const updateNote = useMutation(api.documents.updateContent)

  const [value, setValue] = useState("");
  const debouncedValue = useDebounceState(value, 1000);

  useEffect(() => {
    if (note?.content) {
      setValue(note?.content);
    }
  }, [note]);

  // Handle content change and update backend
  const handleChange = async (content: string) => {
    setValue(content);
  };

  useEffect(() => {
    const saveNote = async () => {
      if (noteId && debouncedValue !== note?.content) {
        await updateNote({
          id: noteId,
          content: debouncedValue,
        });
      }
    };
    saveNote();
  }, [debouncedValue, noteId, updateNote, note?.content]);
  

  // Update backend when the editor loses focus
  // const handleBlur = async () => {
  //   if (noteId) {
  //     await updateNote({
  //       id: noteId,
  //       content: value,
  //     });
  //   }
  // };

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions 
  }

  return(
    <>
      <ReactQuill
        placeholder='Start your notes here..'
        modules={module}
        value={value}
        onChange={handleChange}
        // onBlur={handleBlur}
        theme="snow"
        className="h-full"
      />
    </>
  )
}

export default Editor

