import Link from 'next/link'
import React from 'react'
import { cookies } from 'next/headers'

async function Posts({params}) {

  const cookiesStore = cookies()

  const data = await fetch(`https://frontend-test-be.stage.thinkeasy.cz/posts/user/${params.id}`,
    {headers: {
      'Authorization': `Bearer ${cookiesStore.get('accessToken')?.value}` 
    }}
  )
  const posts = await data.json()

  return (
    <ul>
      {posts && posts.map(({id, title, content}) => (
        <li key={id} className='my-4'>
          <h2 className='text-2xl'>{title}</h2>
          <p>{content}</p>
          <Link href={`/posts/${id}`}>Link</Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts