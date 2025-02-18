"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { useCookies } from 'next-client-cookies';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import InputField from '@/components/input-field'
import Button from '@/components/button'
import ErrorMessage from '@/components/error-message';
import { TLoginFormFields, TTokenResponse } from '@/types'
import { request } from '@/requests'
import { useRouter } from 'next/navigation'

const FormFields = z
 .object({
  email: z.string().email({message: 'email must be an valid email format'}),
  password: z.string().nonempty({message: 'password required'})
 })

function LogInForm() {

  const cookiesStore = useCookies()

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TLoginFormFields>({
    resolver: zodResolver(FormFields)
  })
  const onSubmit: SubmitHandler<TLoginFormFields> = async (formData) => {
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
      </div>
      <Button title='Submit' />
      {errors.root?.serverError && <ErrorMessage>wrong credentials</ErrorMessage>}
    </form>
  )
}

export default LogInForm