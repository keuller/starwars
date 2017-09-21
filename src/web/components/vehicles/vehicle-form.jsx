import React, { PureComponent } from 'react'

class VehicleForm extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            id: 0, name: '', model: '', class: '', manufacturer:'', consumables:'',
            credits: 0, crew: 0, length: 0, speed: 0, passengers: 0, capacity: 0
        }
    }

    componentDidMount() {
        if (this.props.data.id > 0) {
            this.setState({...this.props.data})
        }
    }

    doChange(input) {
        this.setState({ [input.target.name]: input.target.value })
    }

    doSave(ev) {
        ev.preventDefault()
        let errors = this.validate()
        if (Object.keys(errors).length > 0) {
            this.setState({ errors })
            return
        }
        
        let data = {...this.state}
        delete data['errors']
        this.props.onSave(data)
    }

    doCancel(ev) {
        ev.preventDefault()
        this.props.onCancel()
    }

    validate() {
        let errors = {}
        if (this.state.name.trim() == '') errors['name'] = 'This field is required.'
        if (this.state.model.trim() == '') errors['model'] = 'This field is required.'
        if (this.state.class.trim() == '') errors['class'] = 'This field is required.'
        if (this.state.manufacturer.trim() == '') errors['manufacturer'] = 'This field is required.'
        return errors
    }

    render() {
        return (
            <div className="card">
                <header className="card-header">
                    <span className="card-header-title">Edit Vehicle</span>
                </header>
                
                <div className="card-content">
                    <form id="vehicle_form" action="#">
                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <label htmlFor="name" className="label">Name</label>
                                <input type="text" name="name" className="input" 
                                    maxLength="50" value={this.state.name} onInput={(input) => this.doChange(input)} />
                                {this.state.errors.name ? <p className="help is-danger">{this.state.errors['name']}</p> : null}
                            </div>
                            <div className="control is-expanded">
                                <label htmlFor="model" className="label">Model</label>
                                <input type="text" name="model" className="input" maxLength="30"
                                    value={this.state.model} onInput={(input) => this.doChange(input)} />
                                {this.state.errors.model ? <p className="help is-danger">{this.state.errors['model']}</p> : null}
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <label htmlFor="manufacturer" className="label">Manufacturer</label>
                                <input type="text" name="manufacturer" className="input" maxLength="50"
                                    value={this.state.manufacturer} onInput={(input) => this.doChange(input)} />
                                {this.state.errors.manufacturer ? <p className="help is-danger">{this.state.errors['manufacturer']}</p> : null}
                            </div>
                            <div className="control is-expanded">
                                <label htmlFor="class" className="label">Class</label>
                                <input type="text" name="class" className="input" maxLength="30" 
                                    value={this.state.class} onInput={(input) => this.doChange(input)} />
                                {this.state.errors.class ? <p className="help is-danger">{this.state.errors['class']}</p> : null}
                            </div>
                            <div className="control is-expanded">
                                <label htmlFor="consume" className="label">Consumables</label>
                                <input type="text" name="consumables" className="input" maxLength="30" 
                                    value={this.state.consumables} onInput={(input) => this.doChange(input)} />
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <label htmlFor="credits" className="label">Credits</label>
                                <input type="text" name="credits" className="input" maxLength="5" 
                                    value={this.state.credits} onInput={(input) => this.doChange(input)} />
                            </div>
                            <div className="control is-expanded">
                                <label htmlFor="length" className="label">Length</label>
                                <input type="text" name="length" className="input" maxLength="5" 
                                    value={this.state.length} onInput={(input) => this.doChange(input)} />
                            </div>
                            <div className="control is-expanded">
                                <label htmlFor="crew" className="label">Crew</label>
                                <input type="text" name="crew" className="input" maxLength="5"
                                    value={this.state.crew} onInput={(input) => this.doChange(input)} />
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <label htmlFor="speed" className="label">Speed</label>
                                <input type="text" name="speed" className="input" maxLength="5"
                                    value={this.state.speed} onInput={(input) => this.doChange(input)} />
                            </div>
                            <div className="control is-expanded">
                                <label htmlFor="pass" className="label">Passangers</label>
                                <input type="text" name="passengers" className="input" maxLength="5"
                                    value={this.state.passengers} onInput={(input) => this.doChange(input)} />
                            </div>
                            <div className="control is-expanded">
                                <label htmlFor="capacity" className="label">Capacity</label>
                                <input type="text" name="capacity" className="input" maxLength="5" 
                                    value={this.state.capacity} onInput={(input) => this.doChange(input)} />
                            </div>
                        </div>
                    </form>
                </div>

                <footer className="card-footer">
                    <a className="card-footer-item" onClick={(ev) => this.doSave(ev)}>Save</a>
                    <a className="card-footer-item" onClick={(ev) => this.doCancel(ev)}>Cancel</a>
                </footer>
            </div>
        )
    }
}

export default VehicleForm
