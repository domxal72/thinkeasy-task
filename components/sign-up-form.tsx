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


const url = 'https://frontend-test-be.stage.thinkeasy.cz/auth/signup'

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

  const {
    register,
    handleSubmit,
    // watch,
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

//   console.log(watch("example")) // watch input value by passing the name of it
  

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}

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
        <InputField
          name="firstname"
          placeholder='firstname'
          register={register}
          error={errors.firstname}
        />
        <InputField
          name="lastname"
          placeholder='lastname'
          register={register}
          error={errors.lastname}
        />
      </div>

      <input type="submit" />
    </form>
  )
}

export default SignUpForm