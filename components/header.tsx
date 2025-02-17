import React from 'react'
import CustomLink from '@/components/custom-link'

function Header() {
  return (
    <div className='fixed w-full bg-gray-300'>
      <div className='m-auto max-w-3xl h-14 flex gap-4 items-center px-4'>
        <CustomLink href={'/auth/sign-up'} text='sign up' />
        <CustomLink href={'/auth/log-in'} text='log in' />
        <CustomLink href={'/posts'} text='posts' />
      </div>
    </div>
  )
}

export default Header