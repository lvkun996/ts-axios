import {AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
console.log('helo www');

function createInstance ():AxiosInstance {
    const context = new Axios()
    
    const instance = Axios.prototype.request.bind(context)

    extend(instance, context)

    return instance as AxiosInstance
}

const axios = createInstance()
console.log(axios, 'axios');

export default axios