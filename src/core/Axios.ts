import { AxiosRequestConfig, AxiosPromise, Methods, AxiosResponse, ResolvedFn, RejectedFn } from "../types";
import dispatchRequest from './dispatchRequest'
import interceptorMange from "./InterceptorMange";
import  mergeConfig from './mergeConfig'

interface interceptors {
    request: interceptorMange<AxiosRequestConfig>,
    response: interceptorMange<AxiosResponse>
}

interface PromiseChain {
    resolved: ResolvedFn
    rejected?: RejectedFn
}

export default class Axios {
    defaults: AxiosRequestConfig
    interceptors: interceptors

    constructor (config: AxiosRequestConfig) {

        this.defaults = config

        this.interceptors = {
            request: new interceptorMange<AxiosRequestConfig>(),
            response: new interceptorMange<AxiosResponse>()
        }
    }

    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }
        
        config = mergeConfig(this.defaults, config)

        const chain:PromiseChain[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }]

        // interceptor 相当于一个函数形参 
        // 在 interceptorMange 类 里取到对应的request 和 response后
        // 放入Promise chain中

        this.interceptors.request.forEach( interceptor => {
      
            
      
            
            chain.unshift(interceptor)
        })
        
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor)
        })


     
        
        let promise = Promise.resolve(config)
        console.log(promise, 'promise');
        console.log(chain, 'chain');
        
        while(chain.length) {
            const {resolved, rejected} = chain.shift()!
            console.log(resolved, rejected, 'resolved, rejected');
            
            promise = promise.then(resolved, rejected)
        }

        return promise
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestWithOutData('get', url, config)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestWithOutData('delete', url, config)
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestWithOutData('options', url, config)
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestWithOutData('head', url, config)
    }


    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestWithData('post', url, data, config)
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestWithData('put', url, data, config)
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestWithData('patch', url, data, config)
    }

    _requestWithOutData(methods: Methods, url: string, config?: AxiosRequestConfig) {
        return this.request(Object.assign( config || {}, {
            methods,
            url
        }))
    }

    _requestWithData(methods: Methods, url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request(Object.assign(config || {}, {
            methods,
            url,
            data
        }))
    }
}