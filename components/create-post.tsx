"use client"
import React, {useState} from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useCookies } from 'next-client-cookies';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import InputField from '@/components/input-field'
import Button from '@/components/button'
import ErrorMessage from '@/components/error-message';
import { request } from '@/requests'
import { TPost } from '@/types';

type TPostFormFields = {
  title: string
  content: string
}

const FormFields = z
 .object({
  title: z.string().nonempty({message: 'title must not be empty'}),
  content: z.string().nonempty({message: 'content must not be empty'})
 })

function CreatePost() {
  const cookiesStore = useCookies()
  const [success, setSuccess] = useState<string>('')

  const handleSuccess = (title: string) => {
    if(title){
      setSuccess(title)
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<TPostFormFields>({
    resolver: zodResolver(FormFields)
  })
  const onSubmit: SubmitHandler<TPostFormFields> = async (formData) => {
    const res = await request<TPost>({
      relativeUrl: 'posts',
      method: 'POST',
      token: cookiesStore.get('accessToken'),
      data: formData
    })
    
    if(res.status < 400){
      handleSuccess(res.data.title)
      reset()
    } else {
      setError('root.serverError', {
        message: 'Something went wrong when submit',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputField
          label='title'
          error={errors.title}
          register={register}
          required
        />
        <InputField
          label='content'
          error={errors.content}
          register={register}
          required
        />
      </div>

      <Button title='Submit' />
      {success &&<div className='text-green-600'>&quot;{success}&quot; has been added..</div>}
      {errors.root?.serverError && <ErrorMessage>{errors.root?.serverError.message}</ErrorMessage>}
    </form>
  )
}

export default CreatePost