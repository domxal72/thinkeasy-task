"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useCookies } from 'next-client-cookies';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import InputField from '@/components/input-field'

export type TPostFormFields = {
  title: string
  content: string
}

export const FormFields = z
 .object({
  title: z.string().nonempty({message: 'title must not be empty'}),
  content: z.string().nonempty({message: 'content must not be empty'})
,
 })

const url = 'https://frontend-test-be.stage.thinkeasy.cz/posts'

function CreatePost() {
  const cookiesStore = useCookies()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPostFormFields>({
    resolver: zodResolver(FormFields)
  })
  const onSubmit: SubmitHandler<TPostFormFields> = async (data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookiesStore.get('accessToken')}` 
      },
      body: JSON.stringify(data)
    })
    const resData = await res.json()
    console.log(resData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputField
          type='title'
          name="title"
          placeholder='title'
          register={register}
          error={errors.title}
        />
        <InputField
          type='content'
          name="content"
          placeholder='content'
          register={register}
          error={errors.content}
        />
      </div>

      <input type="submit" />
    </form>
  )
}

export default CreatePost