"use client"
import React, {useState} from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useCookies } from 'next-client-cookies';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import InputField from '@/components/input-field'
import { request } from '@/requests'
import { TPost } from '@/types';

export type TPostFormFields = {
  title: string
  content: string
}

export const FormFields = z
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
    formState: { errors },
  } = useForm<TPostFormFields>({
    resolver: zodResolver(FormFields)
  })
  const onSubmit: SubmitHandler<TPostFormFields> = async (data) => {
    const resData = await request<TPost>({
      relativeUrl: 'posts',
      method: 'POST',
      token: cookiesStore.get('accessToken'),
      data: data
    })
    handleSuccess(resData.title)
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

      <input type="submit" />
      {success &&<span>&quot;{success}&quot; has been added..</span>}
    </form>
  )
}

export default CreatePost