import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import moment from 'moment';
import { connect } from 'react-redux';
import { removeEventRequest, removeGuestRequest } from '.';
import RemoveEvent from './RemoveEvent';

class Event extends Component {
    render() {
        const { id, type, name, link, address, description, restricted, datetime, guests } = this.props.event.toJS();
        const color = type === 'Food' ? 'lightskyblue' : 'navajowhite';
        return (
            <div className="col-md-12 col-sm-6">
                <div className="card">
                    <div className="card-header" style={{ backgroundColor: color }}>
                        {/*<h2><a href={link || '#'}>{location}</a>*/}
                        <h2 style={{ float: 'left' }}>
                            <a
                                style={{ textDecoration: 'underline', color: 'black' }}
                                target="_blank"
                                rel="noopener noreferrer"
                                href={link}>{name}
                            </a>
                        </h2>
                        {/*TODO: Add Modal confirmation here*/}
                        <RemoveEvent name={name} id={id} callback={this.props.deleteEvent}/>
                        {/*<Button className="remove" bsStyle="primary" onClick={() => this.props.deleteEvent(id)}>X</Button>*/}
                        <br />
                        <p style={{ clear: 'left' }}>{address}</p>
                        <p style={{ clear: 'left', marginBottom: '0px' }}>
                            {moment(datetime).format('MM/DD h:mm a')}
                        </p>
                    </div>
                    <div className="card-block">
                        {/*<h4 className="card-title"></h4>*/}
                        <p className="card-text">{description}</p>
                        {restricted && 
                        <p className="text-muted">Note: This event has been marked as Over 21 Only</p>}
                        <hr />
                        <h4>Going</h4>
                        <ul className="list-group">
                            {guests.map(g => {
                                console.log(g);
                                return (
                                    <li key={g.name} className="list-group-item">
                                        {g.name}
                                        <Button 
                                            bsStyle="secondary" 
                                            style={{padding: '0px 15px'}}
                                            className="pull-right"
                                            onClick={() => {
                                                this.props.removeGuest(id, g.id)
                                            }}>
                                            <i className="fa fa-minus" aria-hidden="true"></i>
                                        </Button>
                                    </li>
                                )
                            })
                            }
                            <hr />
                            <SignUpForm rID={id} form={`SignupForm_${id}`} />
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        deleteEvent: (id) => dispatch(removeEventRequest(id)),
        removeGuest: (eventId, id) => dispatch(removeGuestRequest(eventId, id))
    };
}

export default connect(null, mapDispatchToProps)(Event);