async function SinglePost({params}: {
  params: Promise<{ id: string }>
} ) {
  const data = await fetch(`https://frontend-test-be.stage.thinkeasy.cz/posts/${(await params).id}`)
  const {content, title } = await data.json()

  return (
    <div>
      <h2 className='text-2xl'>{title}</h2>
      <p>{content}</p>
    </div>
    )
}

export default SinglePost