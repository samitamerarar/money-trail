import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import all from "../assets/all.png";
import amenities from "../assets/amenities.png";
import automobile from "../assets/automobile.png";
import clothing from "../assets/clothing.png";
import electronics from "../assets/electronics.png";
import food from "../assets/food.png";
import fun from "../assets/fun.png";
import medical from "../assets/medical.png";
import other from "../assets/other.png";
import personalcare from "../assets/personalcare.png";

const images = [
  all,
  amenities,
  automobile,
  clothing,
  electronics,
  food,
  fun,
  medical,
  other,
  personalcare,
];

export const CategoryImage = (props) => {
  const [categoryImage, setCategoryImage] = useState(images[0]);

  useEffect(() => {
    props.image &&
      setCategoryImage(images.filter((i) => i.indexOf(props.image) !== -1));
  }, [props.image]);

  return (
    <Image
      style={{ opacity: "0.75" }}
      src={categoryImage[0]}
      rounded
      fluid
      className="p-5"
    />
  );
};

CategoryImage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(CategoryImage);
