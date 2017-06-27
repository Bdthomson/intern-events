import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class RemoveEvent extends Component {
    constructor(props) {
        super(props)
        this.state = { showModal: false }
    }

    close() { this.setState({ showModal: false }); }
    open() { this.setState({ showModal: true }); }


    render() {
        return (
            <div>
                <Button bsStyle="primary" className="pull-right" onClick={this.open.bind(this)}>X</Button>

                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Event</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h2>{this.props.name}</h2>
                        <p>Are you sure you want to delete event?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Cancel</Button>
                        <Button bsStyle="danger" onClick={() => {
                            // TODO: Send Validation Request
                            this.props.callback(this.props.id);
                            this.close.bind(this);
                        }}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default RemoveEvent;
