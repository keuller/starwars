import React, { PureComponent } from 'react'
import VehicleTable from 'components/vehicles/vehicle-table'
import VehicleForm from 'components/vehicles/vehicle-form'
import Confirm from 'components/util/confirm'
import { createVehicle, fetchVehicles, findVehicle, saveVehicle, removeVehicle } from 'store/vehicle'

class Vehicles extends PureComponent {

    constructor(props) {
        super(props)
        this.state = { isEdit: (this.props.edit.id == undefined), isRemoving:false, id: 0 }
    }

    reset() {
        this.props.dispatch(fetchVehicles())
    }

    create() {
        this.props.dispatch(createVehicle())
    }

    remove() {
        this.props.dispatch(removeVehicle(this.state.id))
        this.reset()
    }

    save(item) {
        this.props.dispatch(saveVehicle(item))
        this.reset()
    }

    openModal(id) {
        this.setState({ isRemoving:true, id })
    }

    closeModal() {
        this.setState({ isRemoving:false, id: 0 })
    }

    componentDidUpdate(prevProps) {
        this.setState({ isEdit: (this.props.edit.id == undefined) })
    }

    addButton() {
        return (
            <button className="button is-primary has-icon" onClick={(ev) => this.create()}>
                <span className="icon is-small">
                    <i className="fa fa-plus-square"></i>
                </span>
                <span>Add New</span>
            </button>
        )
    }

    render() {
        return (
            <div className="box">
                <div className="is-pulled-right">
                {this.state.isEdit ? this.addButton() : null}
                </div>

                <h2 className="subtitle is-4">Vehicles</h2>

                <div className="columns">
                    <div className="column is-12">
                        {this.state.isEdit ? 
                            <VehicleTable data={this.props.data} 
                                onEdit={(id) => this.props.dispatch(findVehicle(id))} 
                                onRemove={(id) => this.openModal(id)} /> : 
                            <VehicleForm data={this.props.edit} 
                                onSave={(item) => this.save(item)} 
                                onCancel={() => this.reset()} /> }
                    </div>
                </div>

                {this.state.isRemoving ? 
                    <Confirm onClose={this.closeModal.bind(this)} onConfirm={() => this.remove()}>
                        <h5 className="subtitle is-5">Do you want remove the Vehicle with ID {this.state.id} ?</h5>
                    </Confirm> : null}
            </div>
        )
    }
}

export default Vehicles