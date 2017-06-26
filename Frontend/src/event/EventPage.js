import React, { Component } from 'react';
import Event from './Event';
import { connect } from 'react-redux';
import { fetchEventsRequest, removeEventRequest } from '.';

class EventPage extends Component {
    componentWillMount() {
        this.props.fetchEvents()
    }
    render() {
        if (this.props.events === null) {
            return null;
        }
        return (
            <div>
                <h1>{this.props.events.size === 0 ? "No Events" : null}</h1>
                {this.props.events.sort(byDate).map(e => <Event key={e.get('id')} event={e} />)}
            </div>
        );
    }
}

const byDate = (a, b) => a.get('datetime') > b.get('datetime')

function mapStateToProps(state) {
    return {
        events: state.getIn(['event', 'events'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEvents: () => dispatch(fetchEventsRequest()),
        deleteEvent: (id) => dispatch(removeEventRequest(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventPage);