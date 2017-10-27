'use strict'

import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'index.css'
import 'sass/build.sass'
import App from 'components/app'
import store from 'store'

document.addEventListener('DOMContentLoaded', (ev) => {
    render((
        <Provider store={store}> 
            <App /> 
        </Provider>
    ), document.querySelector('#app'))
})
