"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import InputField from '@/components/input-field'

function PostList({postsData}) {

  const [posts, setPosts] = useState(postsData)
  const [filterString, setFilterString] = useState('')

  const handleChange = (e) => {
    setFilterString(e.target.value)
  }
  
  const filterFunction = ({title, content}) => {
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
        {/* <InputField
          type='email'
          name="email"
          placeholder='email'
          register={register}
          error={errors.email}
          options={{required: true}}
        /> */}
        {posts.filter(filterFunction).map(({id, title, content, authorId}) => (
          <li key={id} className='my-4'>
            <h2 className='text-2xl'>{title}</h2>
            <p>{content}</p>
            <Link href={`/posts/${id}`}>Link</Link>
            <Link href={`/posts/user/${authorId}`}>Author posts</Link>
          </li>
        ))}
      </ul>
  </>
  )
}

export default PostList