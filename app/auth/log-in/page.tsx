"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import InputField from '@/components/input-field'

export type TFormFields = {
  email: string
  password: string
  firstname?: string
  lastname?: string
}

const url = 'https://frontend-test-be.stage.thinkeasy.cz/auth/login'

export const FormFields = z
 .object({
  email: z.string().email({message: 'email must be an valid email format'}),
  password: z
    .string()
    .min(8, { message: "password must be longer than or equal to 8 characters" }),
 })

function SignUpForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormFields>({
    resolver: zodResolver(FormFields)
  })
  const onSubmit: SubmitHandler<TFormFields> = async (data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    console.log(res)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputField
          type='email'
          name="email"
          placeholder='email'
          register={register}
          error={errors.email}
          options={{required: true}}
        />
        <InputField
          type='password'
          name="password"
          placeholder='password'
          register={register}
          error={errors.password}
          options={{required: true}}
        />
      </div>

      <input type="submit" />
    </form>
  )
}

export default SignUpForm