import React, { useState, useEffect } from 'react';
import { Image, Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

var imagesMap = new Map([
    ['all', 'undraw_mobile_payments_re_7udl-green'],
    ['automobile', 'undraw_electric_car_b-7-hl'],
    ['clothing', 'undraw_career_progress_ivdb'],
    ['food', 'undraw_shopping_app_flsj'],
    ['fun', 'undraw_happy_music_g6wc'],
    ['electronics', 'undraw_real_time_sync_re_nky7'],
    ['amenities', 'undraw_remotely_-2-j6y'],
    ['personal', 'undraw_personal_trainer_re_cnua'],
    ['medical', 'undraw_doctors_hwty'],
    ['other', 'undraw_payments_re_77x0']
]);

export const CategoryImage = ({ image }) => {
    const [categoryImage, setCategoryImage] = useState('undraw_vault_re_s4my');
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        image && setCategoryImage(imagesMap.get(image));
    }, [image]);

    return (
        <Container className="mb-3">
            <Row>
                <Col className="text-center">
                    <Image
                        style={imageLoaded ? { opacity: '0.90' } : { display: 'none' }}
                        src={require(`../assets/${categoryImage}.svg`)}
                        height="192px"
                        className="p-3 shadow-light w-100"
                        onLoad={() => setImageLoaded(true)}
                    />
                </Col>
            </Row>
        </Container>
    );
};

CategoryImage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(CategoryImage);
