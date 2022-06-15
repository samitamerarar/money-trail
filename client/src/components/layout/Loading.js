import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ScaleLoader from 'react-spinners/ScaleLoader';
import ClipLoader from 'react-spinners/ClipLoader';

export const Loading = (props) => {
    const [timeoutLoading, setTimeoutLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => setTimeoutLoading(true), 3000);
    }, []);

    return (
        <>
            {props.small ? (
                <Row className="p-0 m-0">
                    <ClipLoader color={'#007bff'} speedMultiplier={1} size={20} />
                    <div className="ml-2">Loading {props.loadingwhat}...</div>
                </Row>
            ) : (
                <Container className="mt-5 mb-5">
                    <Row className="justify-content-center m-3">Loading {props.loadingwhat}...</Row>
                    <Row className="justify-content-center">
                        <ScaleLoader color={'#007bff'} speedMultiplier={1} />
                    </Row>
                </Container>
            )}
            <Container className="p-0">
                <Row className="justify-content-center m-0">{timeoutLoading ? <>It's broken?</> : <></>}</Row>
            </Container>
        </>
    );
};

Loading.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Loading);
