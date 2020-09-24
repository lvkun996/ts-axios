

const toString = Object.prototype.toString


export const isDate = (value: any): value is Date => {
    return toString.call(value) === '[obeject Date]'
}

// 只能判断是否是对象 但是buff流之类的typeof 后 也是对象
// export const isObject = (value:any): value is object => {
//     return value !== null && typeof value === 'object'
// }

export const isPlainObject = (value:any): value is Object =>  {
    return toString.call(value) === '[object Obejct]'
}


export function extend <T, U>(to: T, from: U): T & U {
    console.log(to, from);
    
    for(const key in from) {
        ;(to as T & U)[key] = from[key] as any
    }

    return to as T & U
}


export function deepMerge (...objs:any[]):any {

    const result = Object.create(null)

    objs.forEach( obj => {
        if (obj) {
            Object.keys(obj).forEach( key => {
                const val = obj[key]
                if (isPlainObject(val)) {
                    if (isPlainObject(result[key])) {
                        result[key] = deepMerge(result[key], val)
                    } else {
                        result[key] = deepMerge({}, val)
                    }

                } else {
                    result[key] = val
                }
            } )
        }
    })
}