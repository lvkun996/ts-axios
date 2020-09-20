import { AxiosRequestConfig, AxiosPromise, Methods, AxiosResponse, ResolvedFn, RejectedFn } from "../types";
import dispatchRequest from './dispatchRequest'
import interceptorMange from "./InterceptorMange";


interface interceptors {
    request: interceptorMange<AxiosRequestConfig>,
    response: interceptorMange<AxiosResponse>
}

interface PromiseChain {
    resolved: ResolvedFn
    rejected?: RejectedFn
}

export default class Axios {

    interceptors: interceptors

    constructor () {
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

        const chain:PromiseChain[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }]

        this.interceptors.request.forEach( interceptor => {
            chain.unshift(interceptor)
        })

        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor)
        })

        let promise = Promise.resolve(config)

        while(chain.length) {
            const {resolved, rejected} = chain.shift()!
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