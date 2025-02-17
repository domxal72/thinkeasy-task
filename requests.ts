const BASE_URL = 'https://frontend-test-be.stage.thinkeasy.cz/'

type TRequest = {
  relativeUrl: string
  method?: 'GET' | 'POST'
  token?: string
  data?: unknown
}

export async function request<T>(
  {
    relativeUrl,
    method,
    token,
    data
  }: TRequest
): Promise<T>{
  const res = await fetch(BASE_URL + relativeUrl, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: data ? JSON.stringify(data) : null
  })
  return await res.json()
}