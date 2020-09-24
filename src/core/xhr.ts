import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
export default function xhr(config: AxiosRequestConfig):AxiosPromise {
    return new Promise( (resolve, reject) => {
        const { data = null, url, method='get',headers, responseType , timeout} = config
        
        const request = new XMLHttpRequest()
        
    
        if (responseType) {
            request.responseType = responseType
        }
        
        if (timeout) {
            request.timeout = timeout
        }
        
        //  async: true
        request.open(method.toUpperCase() , url!, true)

        request.onerror = function handleError () {
            reject(createError('network error', config, null, request))
        }

        request.ontimeout = function handleTimeout () {
            reject(createError(`Timeout of ${timeout}`, config, 'ECONNABORTED', request))
        }


        request.onreadystatechange = function handleLoad () {
        
            if (request.readyState !==4) {
                return
            }
            
            const responeseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
         
            
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responeseHeaders,
                config,
                request
            }
      
            // resolve(response)
            handleResponse(response, resolve, reject, config, request)
        }
        Object.keys(headers).forEach(key => {
            if (data === null && key.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(key, headers[key])
            }
        })
    
        request.send(data)
    })
}


function handleResponse(response: AxiosResponse, resolve: Function, reject:Function, config:AxiosRequestConfig, request:any): void {
    if (response.status >= 200 && response.status < 300) {
        resolve(response)
    } else {
        reject( createError(`Request failed with status code ${response.status}`, config, null, request,response ))
    }
}