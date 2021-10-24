import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const EditStockFormAdd = (props) => {
  const [priceRendered, setPriceRendered] = useState();
  // Form
  const [form, setForm] = useState({
    symbolNameObj: { symbol: props.previousData.symbol },
    date: props.previousData.date,
    sector: props.previousData.sector,
    risk: props.previousData.risk,
    comments: props.previousData.comments,
  });
  const [errors, setErrors] = useState({});

  const setField = async (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // Errors!
      setErrors(newErrors);
    } else {
      // No Errors
      const formData = { ...form };
      const { previousData } = props;
      formData.price =
        (previousData.shares * previousData.price +
          parseFloat(formData.shares) * formData.price) /
        (parseFloat(formData.shares) + previousData.shares);
      formData.shares = parseFloat(formData.shares) + previousData.shares;
      props.sendFormData(formData);
    }
  };

  const findFormErrors = () => {
    const { price, shares } = form;
    const newErrors = {};
    // price errors
    if (!price || price > 999999 || price <= 0)
      newErrors.price = "must be a valid number!";
    // shares errors
    if (!shares || shares > 999999 || shares <= 0)
      newErrors.shares = "must be a valid number!";

    return newErrors;
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Share(s) bought</Form.Label>
              <Form.Control
                type="number"
                placeholder="# Share(s)"
                onChange={(e) => setField("shares", e.target.value)}
                isInvalid={!!errors.shares}
              />
              <Form.Control.Feedback type="invalid">
                {errors.shares}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Share price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                onChange={(e) => {
                  if (
                    e.target.value.indexOf(".") === -1 ||
                    e.target.value.indexOf(".") ===
                      e.target.value.toString().length - 3 ||
                    e.target.value.indexOf(".") ===
                      e.target.value.toString().length - 2
                  ) {
                    setField("price", e.target.value);
                    setPriceRendered(e.target.value);
                  }
                }}
                value={priceRendered}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Col className="d-flex justify-content-end p-0">
          <Button type="submit" onClick={handleSubmit}>
            Edit Asset
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default EditStockFormAdd;
