"use client"

import Loader from '@components/Loader'
import { AuthLoading, Authenticated, useConvexAuth } from 'convex/react'
import React from 'react'

type Props = {}

const layout = ({children}:{children : React.ReactNode}) => {

  return (
    <div suppressHydrationWarning>
      <AuthLoading>
        <Loader/>
      </AuthLoading>
      <Authenticated>
        {children}
      </Authenticated>
    </div>
  )
}

export default layout