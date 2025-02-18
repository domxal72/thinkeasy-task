"use client"
import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { usePathname } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { TPost } from '@/types'
import CustomLink from '@/components/custom-link'
import InputField from '@/components/input-field'
import ErrorMessage from '@/components/error-message'

const SearchField = z
 .object({
    search: z.string(),
 })

type TSinglePostProps = {
  post: TPost
}

function SinglePost({post}: TSinglePostProps){

  const path = usePathname()

  const {id, title, content, authorId} = post
  return (
    <li key={id} className='my-4'>
      <h2 className='text-2xl'>{title}</h2>
      <div className='flex gap-4'>
        <CustomLink href={`/posts/${id}`} text='Post' />
        {!path.includes('/posts/user') && <CustomLink href={`/posts/user/${authorId}`} text='Author posts' />}
      </div>
      <p>{content}</p>
    </li>
  )
}

function PostList({postsData} : {postsData: TPost[]}) {

  const [filterString, setFilterString] = useState('')

    const {
      register,
      formState: { errors },
    } = useForm({
      resolver: zodResolver<{search: string}>(SearchField)
    })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(e.target.value)
  }
  
  const filterFunction = ({title, content}: {title: string, content: string}) => {
    return title.includes(filterString) || content.includes(filterString) || filterString === ''
  }

  if(!Array.isArray(postsData)){
    return <ErrorMessage>wrong data</ErrorMessage>
  }

  return (
    <div>
      <InputField 
        error={errors.search}
        label='search'
        register={register}
        onChange={handleChange}
      />
    <ul>
        {postsData && postsData.filter(filterFunction).map((post) => (
          <SinglePost key={post.id} post={post} />
        ))}
      </ul>
  </div>
  )
}

export default PostList