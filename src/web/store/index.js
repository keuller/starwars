import { combineReducers, createStore, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import vehicle, { fetchVehiclesEpic, findVehicleEpic, saveVehicleEpic, removeVehicleEpic } from 'store/vehicle'

const rootEpic = combineEpics(fetchVehiclesEpic, findVehicleEpic, saveVehicleEpic, removeVehicleEpic)
const rootReducer = combineReducers({ vehicle })
const epicMiddleware = createEpicMiddleware(rootEpic)

const initialState = {
    vehicle: { error:false, loading: false, list:[], selected: {} }
}

export default createStore(rootReducer, initialState, applyMiddleware(epicMiddleware))
