

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
