import React from 'react'

interface TButtonProps extends React.HTMLProps<HTMLButtonElement> {
  title: string
  props?: React.ComponentProps<'button'>
}

const Button: React.FC<TButtonProps> = ({title, props}) => {
  return (
    <button className='border-2 border-gray-400 rounded md p-2 my-2' {...props}>{title}</button>
  )
}

export default Button