import React, { PureComponent } from 'react'

class Confirm extends PureComponent {

    constructor(props) {
        super(props)
    }

    doConfirm(ev) {
        ev.preventDefault()
        if (this.props.onConfirm) this.props.onConfirm()
        this.doCancel(ev)
    }

    doCancel(ev) {
        ev.preventDefault()
        if (this.props.onClose) this.props.onClose()
    }

    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <div className="modal-card-head">
                        <span className="modal-card-title">Starwars</span>
                        <button className="delete" aria-label="close" onClick={(ev) => this.doCancel(ev)}></button>
                    </div>
                    <div className="modal-card-body">
                        {this.props.children}
                    </div>
                    <footer className="modal-card-foot">
                        <button className="button is-primary" onClick={(ev) => this.doConfirm(ev)}>Confirm</button>
                        <button className="button" onClick={(ev) => this.doCancel(ev)}>Cancel</button>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Confirm
