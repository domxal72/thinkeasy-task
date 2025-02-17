import { FieldError, UseFormRegister, Path, FieldValues } from "react-hook-form"
import { HTMLInputTypeAttribute } from "react"

type TInputFieldProps<T extends FieldValues> = {
  error: FieldError | undefined;
  label: Path<T>
  type?: HTMLInputTypeAttribute
  register: UseFormRegister<T>
  required?: boolean
  rest?: unknown
}

function InputField<T extends FieldValues>({error, type = "text", register, label, required, ...rest}: TInputFieldProps<T>) {

  return (
    <div className='flex flex-col'>
      {label && <label>{label}</label> }
      <input
        type={type}
        className='border-2 border-gray-400 rounded md p-2 my-2'
        {...register(label, { required })}
        {...rest}
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  )
}

export default InputField