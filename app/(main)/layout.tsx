"use client"

import Loader from '@components/Loader'
import { AuthLoading, Authenticated, Unauthenticated, useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const layout = ({children}:{children : React.ReactNode}) => {

    const {isAuthenticated, isLoading} = useConvexAuth()

  return (
    <div>
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