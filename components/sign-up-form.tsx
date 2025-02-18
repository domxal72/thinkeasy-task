"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation'
import { z } from "zod"
import InputField from '@/components/input-field'
import Button from '@/components/button'
import { TSignFormFields, TTokenResponse } from '@/types'
import { request } from '@/requests'
import ErrorMessage from '@/components/error-message';

const FormFields = z
 .object({
  email: z.string().email({message: 'email must be an valid email format'}),
  password: z
    .string()
    .min(8, { message: "password must be longer than or equal to 8 characters" }),
  firstname: z.string().optional(),
  lastname: z.string().optional()
 })

function SignUpForm() {

  const cookiesStore = useCookies()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TSignFormFields>({
    resolver: zodResolver(FormFields)
  })
  const onSubmit: SubmitHandler<TSignFormFields> = async (formData) => {
    const res = await request<TTokenResponse>({
      relativeUrl: 'auth/login',
      method: 'POST',
      data: formData
    })

    if(res.status < 400){
      cookiesStore.set('accessToken', res.data.accessToken)
      router.push('/posts')
    } else {
      setError('root.serverError', {
        message: 'Something went wrong when submit',
      });
      console.log(errors)
    }
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputField
          type='email'
          label='email'
          error={errors.email}
          register={register}
          required
        />
        <InputField
          type='password'
          label='password'
          error={errors.password}
          register={register}
          required
        />
        <InputField
          error={errors.firstname}
          label='firstname'
          register={register}
        />
        <InputField
          label='lastname'
          error={errors.lastname}
          register={register}
        />
      </div>

      {errors.root?.serverError && <ErrorMessage>Sign up failed..</ErrorMessage>}
      <Button title='Submit' />
    </form>
  )
}

export default SignUpForm