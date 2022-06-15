import React, { useState, useEffect } from 'react';
import { Image, Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import all from '../assets/all.png';
import amenities from '../assets/amenities.png';
import automobile from '../assets/automobile.png';
import clothing from '../assets/clothing.png';
import electronics from '../assets/electronics.png';
import food from '../assets/food.png';
import fun from '../assets/fun.png';
import medical from '../assets/medical.png';
import other from '../assets/other.png';
import personalcare from '../assets/personalcare.png';
import Loading from '../../layout/Loading';

const images = [all, amenities, automobile, clothing, electronics, food, fun, medical, other, personalcare];

export const CategoryImage = ({ image }) => {
    const [categoryImage, setCategoryImage] = useState(all);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        image && setCategoryImage(images.filter((i) => i.indexOf(image) !== -1)[0]);
    }, [image]);

    return (
        <Container className="mb-3">
            <Row>
                <Col className="text-center">
                    {imageLoaded ? null : <Loading loadingwhat="image" />}
                    <Image
                        style={imageLoaded ? { opacity: '0.75' } : { display: 'none' }}
                        src={categoryImage ? categoryImage : other}
                        height="192px"
                        className="p-3 shadow-strong"
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
