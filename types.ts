export type TPost = {
  id: string
  createdAt: string
  updatedAt: string
  published: boolean,
  title: string
  content: string
  authorId: string
}

export type TSignFormFields = {
  email: string
  password: string
  firstname?: string
  lastname?: string
}

export type TLoginFormFields = Pick<TSignFormFields, 'email' | 'password'>

export type TTokenResponse = {
  accessToken: "string"
  refreshToken: "string"
}
