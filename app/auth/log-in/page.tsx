import { cookies } from 'next/headers'
import LogInForm from "@/components/log-in-form"

function LogIn() {

  const cookiesStore = cookies()
  console.log(cookiesStore)

  return (
    <LogInForm />
  )
}

export default LogIn