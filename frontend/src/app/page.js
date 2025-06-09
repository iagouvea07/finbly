import React, { Suspense } from 'react'
import HomeClient from './home.js'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeClient />
    </Suspense>
  )
}