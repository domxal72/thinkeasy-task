import React from 'react'

function ErrorMessage({children}: {children: React.ReactNode}) {
  return (
    <div className="text-red-600">{children}</div>
  )
}

export default ErrorMessage