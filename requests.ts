import axios, {AxiosError, AxiosResponse} from "axios"

const instance = axios.create({
  baseURL: 'https://frontend-test-be.stage.thinkeasy.cz/',
});

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
): Promise<AxiosResponse<T>>{
  try {
    const res = await instance({
      url: relativeUrl,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      data: data,
    })

    return res
  } catch (error) {
    const err = error as AxiosError 
    return err.response as AxiosResponse
  }

}
