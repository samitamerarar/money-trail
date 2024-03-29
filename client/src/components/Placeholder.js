import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Placeholder extends Component {
    componentDidMount() {}

    render() {
        return (
            <Container>
                <Row className="pt-3">
                    <h5>Title</h5>
                </Row>
                <Row className="mt-3">
                    <h6>Some stuffs to manage.</h6>
                </Row>
            </Container>
        );
    }
}

Placeholder.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Placeholder);
