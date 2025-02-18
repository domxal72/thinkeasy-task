import {request} from '@/requests'
import { TPost } from '@/types'

async function SinglePost({params}: {
  params: Promise<{ id: string }>
} ) {

  const {data} = await request<TPost>({relativeUrl: `posts/${(await params).id}`})

  return (
    <div>
      <h2 className='text-2xl'>{data.title}</h2>
      <p>{data.content}</p>
    </div>
    )
}

export default SinglePost