type AxiosError = {
  location: string,
  statusCode: number,
  code: string,
  method: string,
  url: string,
}

export const extractAxiosErrorData = (error: any, location: string): AxiosError => {
  const e: AxiosError = {
    location: location,
    statusCode: error.status,
    code: error.code,
    method: error.config.method,
    url: error.config.url,
  }

  return e;
}