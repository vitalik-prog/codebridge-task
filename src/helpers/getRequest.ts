export const getRequest = async (url: string, method = 'GET', body: any = null, headers: any = {}): Promise<unknown> => {
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
      throw e
    }
  }
