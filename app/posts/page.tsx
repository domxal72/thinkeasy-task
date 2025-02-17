import CreatePost from '@/components/create-post'
import PostList from '@/components/post-list'
import SearchPost from '@/components/search-post'

import React from 'react'

async function Posts() {
  const data = await fetch('https://frontend-test-be.stage.thinkeasy.cz/posts')
  const postsData = await data.json()

  return (
    <div>
      <CreatePost />
      {postsData && <PostList postsData={postsData} />}
    </div>
  )
}

export default Posts