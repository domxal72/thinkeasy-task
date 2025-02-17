import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <div className='fixed w-full bg-gray-300'>
      <div className='m-auto max-w-3xl h-10 flex gap-4 items-center px-4'>
        <Link href={'/auth/sign-up'}>sign up</Link>
        <Link href={'/auth/log-in'}>log in</Link>
        <Link href={'/posts'}>posts</Link>
      </div>
    </div>
  )
}

export default Header