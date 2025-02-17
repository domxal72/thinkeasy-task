import Link from 'next/link'

function CustomLink({href, text}: {href: string, text: string}) {
  return (
    <Link href={href} className='bg-slate-400 rounded-md py-2 px-4'>
      {text}
    </Link>
  )
}

export default CustomLink