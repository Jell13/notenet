"use client"

import React from 'react'
import { Spinner } from './Spinner'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='w-screen h-screen grainy'>
        <div className='w-full h-full flex justify-center items-center'>
            <Spinner size={"icon"}/>
        </div>
    </div>
  )
}

export default Loader