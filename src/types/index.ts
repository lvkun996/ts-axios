export type Methods = 'get' | 'GET' 
| 'delete' | 'DELETE' 
| 'head' | 'HEAD' 
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'pacth' | 'PATCH'



export interface AxiosRequestConfig {
    url: string,
    method?: Methods,
    data?: any,
    params?: any,
    headers?:any,
    responseType?: XMLHttpRequestResponseType,
    timeout?: number
}


export interface AxiosResponse {
    data: any,
    status: number,
    statusText: string,
    headers: any,
    config: AxiosRequestConfig,
    request: any
}


export interface AxiosPromise extends Promise<AxiosResponse> {
  
    // responseType?: XMLHttpRequestResponseType
}

export interface AxiosError extends Error { 
     config: AxiosRequestConfig,
     code?: string,
     request?:any,
     response?: AxiosResponse,
     isAxiosError: boolean
}