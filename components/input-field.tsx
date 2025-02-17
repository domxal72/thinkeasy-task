import React from 'react'
import {UseFormRegister, FieldError, RegisterOptions } from "react-hook-form"
import { TFormFields } from "@/components/sign-up-form"
import { TPostFormFields } from "@/components/create-post"

type TInputFieldProps = {
  register: UseFormRegister<TFormFields> | UseFormRegister<TPostFormFields>
  name: "email" | "password" | "firstname" | "lastname" | "content" | "title" | "search"
  error: FieldError | undefined;
  type?: string
  label?: string
  placeholder?: string
  defaultValue?: string
  options?: RegisterOptions<TFormFields, "email" | "password" | "firstname" | "lastname" > | undefined
}

function InputField({type = "string", register, name, label, error, options = {}, placeholder, defaultValue = ''}: TInputFieldProps) {
  return (
    <div className='flex flex-col'>
      {label && <label htmlFor={name}>{label}</label> }
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className='border-2 border-gray-400 rounded md p-2 my-2'
        {...register(name, options)}
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  )
}

export default InputField