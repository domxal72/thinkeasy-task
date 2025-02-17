"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCookies } from 'next-client-cookies';
import { z } from "zod"
import InputField from '@/components/input-field'
import { TSignFormFields, TTokenResponse } from '@/types'
import { request } from '@/requests'

export type TFormFields = {
  email: string
  password: string
  firstname?: string
  lastname?: string
}

export const FormFields = z
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignFormFields>({
    resolver: zodResolver(FormFields)
  })
  const onSubmit: SubmitHandler<TSignFormFields> = async (data) => {
    const resData = await request<TTokenResponse>({
      relativeUrl: 'auth/login',
      method: 'POST',
      data: data
    })
    cookiesStore.set('accessToken', resData.accessToken)
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

      <input type="submit" />
    </form>
  )
}

export default SignUpForm