import { isPlainObject } from './utils'


function noramalizeHeaderName( headers:any, noramalizeName:string):void {
    if (headers === null ) {
        return
    }

    Object.keys(headers).forEach( key => {
        if (key && noramalizeName && key !== noramalizeName && key.toUpperCase() === noramalizeName.toUpperCase()) {
            headers[noramalizeName] = headers[key]
            delete headers[key]
        }
    })
}

export function  processHeaders (headers: any, data: any):any {
    noramalizeHeaderName(headers, data)
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-type'] = 'application/json;charset=utf-8'
        }
        
    }

    return headers

}



export function parseHeaders (headers: string ):any {

    let parsed = Object.create(null) 

    if (!headers) {
        return parsed
    }
   
    headers.split('\r\n').forEach ( item => {
        let [key, value] = item.split(':')
        key = key.trim().toLowerCase()
        if (!key) {
            return
        }
        if (value) {
            value = value.trim()
        }

        parsed[key] = value
    })

    return parsed
}