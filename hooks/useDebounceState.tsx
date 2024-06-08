import React, { useEffect, useState } from 'react'

type Props = {}

const useDebounceState = (value: string, delay: number) => {
  const[debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
        setDebounceValue(value)
    }, delay)
    return () => {
        clearTimeout(handler)
    }
  },[value,delay])

  return debounceValue
}

export default useDebounceState