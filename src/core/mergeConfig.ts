import { AxiosRequestConfig } from "../types";
import { isPlainObject } from "../helpers/utils";
import { deepMerge } from '../helpers/utils'
const starts = Object.create(null)

function defaultStart(val1: any, val2: any): any {
    return typeof val2 !== 'undefined' ? val2: val1
}

function fromVal2Start (val1: any, val2: any):any {
    if (typeof val2 !== 'undefined') {
        return val2
    }
}

// 合并headers
function deepMergeStart (val1: any, val2: any): any {
    if (isPlainObject(val2)) {
        return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {
        return val2
    }  else if (isPlainObject(val1)) {
        return deepMerge(val1)
    } else if (typeof val1 !== 'undefined') {
        return val1
    }
}

// 如果是这些数组数据, 就采用config2的里配置
const stratKeysFromVal2 = ['url', 'data', 'params']


stratKeysFromVal2.forEach( key => {
    starts[key] = fromVal2Start
})


const startKeysDeepMerge = ['headers']

startKeysDeepMerge.forEach( key => {
    starts[key] = deepMergeStart
})

export default function mergeConfig (
    config1: AxiosRequestConfig,
    config2: AxiosRequestConfig
): AxiosRequestConfig {
    if (!config2) {
        config2 = {}
    }

    const config = Object.create(null)
    for(let key in config1) {
        mergeField(key)
    }


    for(let key in config2) {
        if (!config2[key]) {
            mergeField(key)
        }
    }

    // 一个简单的策略合并模式
    function mergeField(key: string):void {
        const start = starts[key] || defaultStart

        config[key] = start(config1[key], config2[key])
    }

    return config

}