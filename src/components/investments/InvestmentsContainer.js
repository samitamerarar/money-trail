import React from 'react';
import { Row, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InvestmentsContent from './content/InvestmentsContent';
import UnDraw from '../layout/UnDraw';

import Background from '../layout/assets/undraw_city_life_gnpr.svg';

const isEmpty = require('is-empty');

export const InvestmentsContainer = (props) => {
    return (
        <Container
            fluid
            className="minimum-height-content"
            style={{
                background: `linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url(${Background}) no-repeat bottom center`,
                backgroundSize: 'contain'
            }}>
            <Container>
                <Row className="pt-3">
                    <h4>Investments</h4>
                </Row>
            </Container>

            {!isEmpty(props.errors) ? (
                <UnDraw
                    image={'undraw_bug_fixing_oc-7-a'}
                    size="45vh"
                    title="There is a problem with the server"
                    subtitle="Try to refresh the page?"
                    refresh={true}
                />
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
