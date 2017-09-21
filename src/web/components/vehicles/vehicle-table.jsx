import React from 'react'

const ActionButton = ({ onEdit, onRemove }) => (
    <div className="dropdown is-right is-hoverable">
        <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dp-mnu">
                <span className="icon is-small">
                    <i className="fa fa-ellipsis-v"></i>
                </span>
            </button>
        </div>
        <div id="dp-mnu" className="dropdown-menu" role="menu">
            <div className="dropdown-content">
                <a className="dropdown-item" onClick={onEdit}>
                    <span className="icon is-small">
                        <i className="fa fa-edit"></i>
                    </span>
                    <span>&nbsp;Edit</span>
                </a>
                <a className="dropdown-item" onClick={onRemove}>
                    <span className="icon is-small">
                        <i className="fa fa-trash"></i>
                    </span>
                    <span>&nbsp;Remove</span>
                </a>
            </div>
        </div>
    </div>
)

const VehicleRow = (props) => (
    <tr>
        <td>{props.data.id}</td>
        <td>{props.data.name}</td>
        <td>{props.data.model}</td>
        <td>{props.data.class}</td>
        <td>
            <ActionButton 
                onEdit={(ev) => { props.onEdit(props.data.id)} }
                onRemove={(ev) => { props.onRemove(props.data.id)} } />
        </td>
    </tr>
)

const VehicleTable = ({ data, onEdit, onRemove }) => {
    return (
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Class</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {data.map(row => <VehicleRow key={row.id} data={row} onEdit={onEdit} onRemove={onRemove} />)}
            </tbody>
        </table>
    )
}

export default VehicleTable
