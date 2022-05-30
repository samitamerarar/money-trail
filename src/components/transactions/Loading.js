import React, { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ScaleLoader from 'react-spinners/ScaleLoader';

export const Loading = (props) => {
    useEffect(() => {}, []);

    return (
        <Container className="mt-5">
            <Row className="justify-content-center m-3">Loading transactions...</Row>
            <Row className="justify-content-center">
                <ScaleLoader color={'#007bff'} speedMultiplier={1} />
            </Row>
        </Container>
    );
};

Loading.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Loading);
