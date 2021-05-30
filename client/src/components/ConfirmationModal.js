import React from 'react';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'

function ConfirmationModal(props) {
    const { msg, no, yes } = props

    return (
        <div className="confirmationModal">
            <h3>Are you sure?</h3>
            <p>{msg}</p>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <button
                    name="no"
                    onClick={no}
                    className="red btn"
                ><RiCloseLine style={{fontSize: "1.1em", marginRight: 3}} /> NO</button>
                <button
                    name="yes"
                    onClick={yes}
                    className="green btn"
                ><RiCheckLine style={{fontSize: "1.1em", marginRight: 3}} /> YES</button>
            </div>
        </div>
    );
}

export default ConfirmationModal;