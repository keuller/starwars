import { types, action, request } from './util'

const baseUrl = 'http://localhost:5000/vehicles'

// action types
const Type = types(
    'VEHICLE_CREATE', 'VEHICLE_FETCH', 'VEHICLE_FETCHED', 'VEHICLE_FIND', 'VEHICLE_FOUND',
    'VEHICLE_SAVE', 'VEHICLE_SAVED', 'VEHICLE_REMOVE', 'VEHICLE_REMOVED'
)

// actions
export const fetchVehicles = action(Type.VEHICLE_FETCH)
export const fetchedData   = action(Type.VEHICLE_FETCHED)
export const createVehicle = action(Type.VEHICLE_CREATE)
export const findVehicle   = action(Type.VEHICLE_FIND)
export const foundVehicle  = action(Type.VEHICLE_FOUND)
export const saveVehicle   = action(Type.VEHICLE_SAVE)
export const savedVehicle  = action(Type.VEHICLE_SAVED)
export const removeVehicle = action(Type.VEHICLE_REMOVE)
export const removedVehicle= action(Type.VEHICLE_REMOVED)

// side effect epics
export const fetchVehiclesEpic = action$ => action$.ofType(Type.VEHICLE_FETCH)
    .mergeMap(action => request(baseUrl).map(data => fetchedData(data)))

export const findVehicleEpic = action$ => action$.ofType(Type.VEHICLE_FIND)
    .mergeMap(action => request(`${baseUrl}/${action.payload}`).map(data => foundVehicle(data)))

export const saveVehicleEpic = action$ => action$.ofType(Type.VEHICLE_SAVE)
    .mergeMap(action => request(baseUrl, 'POST', action.payload).map(data => savedVehicle(data)))

export const removeVehicleEpic = action$ => action$.ofType(Type.VEHICLE_REMOVE)
    .mergeMap(action => request(`${baseUrl}/${action.payload}`, 'DELETE', {}).map(data => removedVehicle(data)))

// reducer function
export default function reducer(state, action = {}) {
    switch(action.type) {
        case Type.VEHICLE_CREATE:
            return {...state, selected: { id:0, name:'', model:'', class:'', crew:0, speed:0 } }
        case Type.VEHICLE_FETCH: 
            return {list:[], loading: true, error: false, selected: {} }
        case Type.VEHICLE_FETCHED: 
            return {selected:{}, loading: false, list: action.payload, error: false }
        case Type.VEHICLE_FOUND:
            return {...state, selected: action.payload}
        case Type.VEHICLE_SAVED:
            return {...state, list: [...state.list]}
    }
    return {...state}
}
