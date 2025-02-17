"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { useCookies } from 'next-client-cookies';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import InputField from '@/components/input-field'
import { TLoginFormFields, TTokenResponse } from '@/types'
import { request } from '@/requests'

export const FormFields = z
 .object({
  email: z.string().email({message: 'email must be an valid email format'}),
  password: z
    .string()
    .min(8, { message: "password must be longer than or equal to 8 characters" }),
 })

function LogInForm() {

  const cookiesStore = useCookies()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormFields>({
    resolver: zodResolver(FormFields)
  })
  const onSubmit: SubmitHandler<TLoginFormFields> = async (data) => {
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
      </div>

      <input type="submit" />
    </form>
  )
}

export default LogInForm