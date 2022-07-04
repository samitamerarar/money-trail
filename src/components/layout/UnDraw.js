import React, { useState } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';

// blue #6da8fd
// light blue #b6d3fe

export const UnDraw = ({ image, size, title, subtitle, refresh }) => {
    const [categoryImage, setCategoryImage] = useState();
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Container className="p-0">
            <Card className="text-center p-0 mb-4 border-0 align-self-end">
                <Container>
                    <Card.Img
                        style={imageLoaded ? { opacity: '0.85', height: size } : { display: 'none' }}
                        src={require(`./assets/${image}.svg`)}
                        className="shadow-medium pt-4"
                        onLoad={() => setImageLoaded(true)}
                    />
                </Container>

                {/* <Row className="justify-content-center"> {imageLoaded ? null : <Loading loadingwhat="image" small={true} />}</Row> */}
                <Card.Body className="p-0 mt-3">
                    <Card.Title style={{ fontSize: '1.2rem' }}>{title}</Card.Title>
                    <Card.Text>{subtitle}</Card.Text>
                    {refresh && (
                        <Button onClick={() => window.location.reload(false)} variant="primary">
                            Refresh
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

UnDraw.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(UnDraw);
