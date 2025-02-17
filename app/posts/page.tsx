import CreatePost from '@/components/create-post'
import PostList from '@/components/post-list'
import { request } from '@/requests'
import { TPost } from '@/types'

async function Posts() {
  const postsData = await request<TPost[]>({relativeUrl: 'posts'})

  return (
    <div>
      <CreatePost />
      {postsData && <PostList postsData={postsData} />}
    </div>
  )
}

export default Posts