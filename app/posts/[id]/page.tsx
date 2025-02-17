

async function SinglePost({params}) {

  console.log(params)

  const data = await fetch(`https://frontend-test-be.stage.thinkeasy.cz/posts/${params.id}`)
  const {id, content, title } = await data.json()

  return (
    <div>
      <h2 className='text-2xl'>{title}</h2>
      <p>{content}</p>
    </div>
    )
}

export default SinglePost