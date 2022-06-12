import React from 'react';
import { Row, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Browser } from 'react-kawaii';

import InvestmentsContent from './content/InvestmentsContent';

const isEmpty = require('is-empty');

export const InvestmentsContainer = (props) => {
    return (
        <Container fluid>
            <Container>
                <Row className="mt-3">
                    <h4>Investments</h4>
                </Row>
            </Container>

            {!isEmpty(props.errors) ? (
                <Container className="mt-5">
                    <Row className="justify-content-center m-3 text-center">
                        There is a problem with the server.
                        <br />
                        Try to refresh the page?
                    </Row>
                    <Row className="justify-content-center m-3">
                        <Browser size={150} mood="ko" color="#DC143C" />
                    </Row>
                </Container>
            ) : (
                <InvestmentsContent />
            )}
        </Container>
    );
};

InvestmentsContainer.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {})(InvestmentsContainer);
