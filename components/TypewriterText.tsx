"use client"

import React from 'react'
import Typewriter from 'typewriter-effect';

type Props = {}

const TypewriterText = (props:Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Take notes and have fun.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Learn instead of study.")
          .pauseFor(1000)
          .start();
      }}
    />
  )
}

export default TypewriterText