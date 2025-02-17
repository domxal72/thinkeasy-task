"use client"
import React, {useState} from 'react'
import { TPost } from '@/types'
import CustomLink from '@/components/custom-link'

function PostList({postsData} : {postsData: TPost[]}) {

  const [filterString, setFilterString] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(e.target.value)
  }
  
  const filterFunction = ({title, content}: {title: string, content: string}) => {
    return title.includes(filterString) || content.includes(filterString) || filterString === ''
  }

  return (
  <>
        <input 
          name='search'
          type='string'
          onChange={handleChange}
        />
    <ul>
        {postsData && postsData.filter(filterFunction).map(({id, title, content, authorId}) => (
          <li key={id} className='my-4'>
            <h2 className='text-2xl'>{title}</h2>
            <div className='flex gap-4'>
              <CustomLink href={`/posts/${id}`} text='Post' />
              <CustomLink href={`/posts/user/${authorId}`} text='Author posts' />
            </div>
            <p>{content}</p>
          </li>
        ))}
      </ul>
  </>
  )
}

export default PostList