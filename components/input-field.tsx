import { FieldError, UseFormRegister, Path, FieldValues } from "react-hook-form"
import { HTMLInputTypeAttribute } from "react"
import ErrorMessage from '@/components/error-message';

type TInputFieldProps<T extends FieldValues> = {
  error: FieldError | undefined;
  label: Path<T>
  register: UseFormRegister<T>
  type?: HTMLInputTypeAttribute
  required?: boolean
  rest?: unknown
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function InputField<T extends FieldValues>({error, type = "text", register, label, required, onChange, ...rest}: TInputFieldProps<T>) {

  return (
    <div className='flex flex-col'>
      {label && <label>{label}</label> }
      <input
        type={type}
        className='border-2 border-gray-400 rounded md p-2 my-2'
        {...register(label, { required, onChange })}
        {...rest}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  )
}

export default InputField