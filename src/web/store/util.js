import { fromPromise } from 'rxjs/observable/fromPromise'

export function types(...args) {
    let actionTypes = {}
    if (args.length < 1) return actionTypes
    args.forEach(item => {
        actionTypes[item.toUpperCase()] = item.toUpperCase()
    })
    return actionTypes
}

export function action(type) {
    return (data) => ({ type, payload: data })
}

export function request(url, method, data) {
    if (method && data) {
        let headers = { 'Content-Type':'application/json' }
          , config = { method, headers, body: JSON.stringify(data) }
        return fromPromise(fetch(`${url}`, config).then(resp => resp.json()))
    }
    return fromPromise(fetch(`${url}`).then(resp => resp.json()))
}
