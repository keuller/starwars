import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import AppHeader from 'components/appheader'
import Vehicles from 'components/vehicles'
import { fetchVehicles } from 'store/vehicle'

class App extends PureComponent {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchVehicles())
    }

    render() {
        return (
            <main>
                <AppHeader />
                <p>&nbsp;</p><br/><p>&nbsp;</p>
                <div className="hero container">
                    <Vehicles 
                        dispatch={this.props.dispatch}
                        data={this.props.vehicle.list} 
                        edit={this.props.vehicle.selected} />
                </div>
                <p>&nbsp;</p>
            </main>
        )
    }
}

const stateToProps = (state) => ({
    vehicle: state.vehicle
})

export default connect(stateToProps)(App)
