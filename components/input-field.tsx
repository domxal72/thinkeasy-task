import React from 'react'
import {UseFormRegister, FieldError, RegisterOptions } from "react-hook-form"
import { TFormFields } from "@/components/sign-up-form"

type TInputFieldProps = {
  register: UseFormRegister<TFormFields>
  name: "email" | "password" | "firstname" | "lastname"
  error: FieldError | undefined;
  type?: string
  label?: string
  placeholder?: string
  defaultValue?: string
  options?: RegisterOptions<TFormFields, "email" | "password" | "firstname" | "lastname"> | undefined
}

function InputField({type = "string", register, name, label, error, options = {}, placeholder, defaultValue = ''}: TInputFieldProps) {
  return (
    <div className='flex flex-col'>
      {label && <label htmlFor={name}>{label}</label> }
      <input type={type} placeholder={placeholder} defaultValue={defaultValue} {...register(name, options)} />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  )
}

export default InputField