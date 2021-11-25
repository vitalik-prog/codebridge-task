import {useCallback, useState} from "react";

export const useHttp = () => {
  const [error, setError] = useState(null)
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}): Promise<unknown> => {
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Something wrong')
      }

      return data
    } catch (e: any) {
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { request, error, clearError }
}
