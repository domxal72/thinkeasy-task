import React from 'react'
import { cookies } from 'next/headers'
import { request } from '@/requests'
import { TPost } from '@/types'
import PostList from '@/components/post-list'

async function Posts({params}: {
  params: Promise<{ id: string }>
}) {
  const cookiesStore = cookies()
  const {data} = await request<TPost[]>({
    relativeUrl: `posts/user/${(await params).id}`,
    token: cookiesStore.get('accessToken')?.value
  })

  return (
    <PostList postsData={data} />
  )
}

export default Posts