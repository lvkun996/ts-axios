import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        },
        aa: '22'
    }
}

const methodsNodata = ['delete', 'get', 'head', 'options']

methodsNodata.forEach( method => {
    defaults.headers[method] = {}
})

const methodsWithdata = ['post', 'put', 'patch']

methodsWithdata.forEach(method => {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})



export default defaults