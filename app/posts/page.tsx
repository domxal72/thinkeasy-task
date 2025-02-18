import CreatePost from '@/components/create-post'
import PostList from '@/components/post-list'
import { request } from '@/requests'
import { TPost } from '@/types'

async function Posts() {
  const {data} = await request<TPost[]>({relativeUrl: 'posts'})

  return (
    <div>
      <CreatePost />
      <PostList postsData={data} />
    </div>
  )
}

export default Posts