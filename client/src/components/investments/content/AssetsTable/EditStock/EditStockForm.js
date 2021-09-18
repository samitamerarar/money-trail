import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Overlay,
  Tooltip,
} from "react-bootstrap";

const EditStockForm = (props) => {
  // Form
  const [form, setForm] = useState({
    symbolNameObj: { symbol: props.previousData.symbol },
    shares: props.previousData.shares,
    price: props.previousData.price,
    date: props.previousData.date,
    sector: props.previousData.sector,
    risk: props.previousData.risk,
    comments: props.previousData.comments,
  });
  const [errors, setErrors] = useState({});

  // Tooltip
  const [showSectorsDrivers, setShowSectorsDrivers] = useState(false);
  const targetSectorsDrivers = useRef(null);
  const [showRisk, setShowRisk] = useState(false);
  const targetRisk = useRef(null);

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
      props.sendFormData(form);
    }
  };

  const findFormErrors = () => {
    const { sector, price, shares, date, comments, risk } = form;
    const newErrors = {};
    // price errors
    if (!price || price > 999999 || price <= 0)
      newErrors.price = "must be a valid number!";
    // shares errors
    if (!shares || shares > 999999 || shares <= 0)
      newErrors.shares = "must be a valid number!";
    // shares errors
    if (!date) newErrors.date = "must have a date!";
    // sector errors
    if (!sector || sector === "") newErrors.sector = "select a sector!";
    // risk errors
    if (!risk || risk === "") newErrors.risk = "select a risk!";

    // comments errors
    //if (!comments || comments === "") newErrors.comments = "cannot be blank!";
    if (comments && comments.length > 200)
      newErrors.comments = "comments are too long! (200 characters max)";

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
                defaultValue={props.previousData.shares}
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
                defaultValue={props.previousData.price}
                placeholder="Price"
                onChange={(e) => setField("price", e.target.value)}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>Date of purchase</Form.Label>
          <Form.Control
            type="date"
            name="date"
            defaultValue={props.previousData.date}
            isInvalid={!!errors.date}
            onChange={(e) => setField("date", e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.date}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Sector</Form.Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                className="mb-1"
                variant="info"
                ref={targetSectorsDrivers}
                onClick={() => setShowSectorsDrivers(!showSectorsDrivers)}
                size="sm">
                <small>Toggle Sec. Drivers</small>
              </Button>
              <Overlay
                target={targetSectorsDrivers.current}
                show={showSectorsDrivers}
                placement="left">
                {(props) => (
                  <Tooltip {...props}>
                    <p>
                      <b>Name</b> - <b>Sector Driver</b>
                    </p>
                    <p>CD - Healthy GDP growth</p>
                    <p>CS - N/A (Defensive Sector)</p>
                    <p>Energy - Rising Oil Prices</p>
                    <p>Fin. - Low Unemployment</p>
                    <p>Health - Favorable Gov Policy</p>
                    <p>Ind. - Healthy GDP Growth</p>
                    <p>IT - Product Cycle</p>
                    <p>M. - Rising Commodity Prices</p>
                    <p>RE - Low Interest Rates</p>
                    <p>Tel. - Healthy GDP Growth</p>
                    <p>Util. - N/A (Defensive Sector)</p>
                  </Tooltip>
                )}
              </Overlay>
            </Col>
          </Row>

          <Form.Control
            as="select"
            defaultValue={props.previousData.sector}
            onChange={(e) => setField("sector", e.target.value)}
            isInvalid={!!errors.sector}>
            <option value="">Select a sector...</option>
            <option value="Consumer Discretionary">
              Consumer Discretionary
            </option>
            <option value="Consumer Staples">Consumer Staples</option>
            <option value="Financials">Financials</option>
            <option value="Health Care">Health Care</option>
            <option value="Industrials">Industrials</option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Materials">Materials</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Telecommunications Services">
              Telecommunications Services
            </option>
            <option value="Utilities">Utilities</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.sector}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mt-4">
          <Row>
            <Col>
              <Form.Label>Investment Risk</Form.Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                className="mb-1"
                variant="info"
                ref={targetRisk}
                onClick={() => setShowRisk(!showRisk)}
                size="sm">
                <small>Toggle Risk Info</small>
              </Button>
              <Overlay
                target={targetRisk.current}
                show={showRisk}
                placement="left">
                {(props) => (
                  <Tooltip {...props}>
                    There are 2 standard types of investment risk classes. 1
                    risk class is simply called more-risky and the other
                    investment class is called less-risky. The less risky class
                    consists of investments that are more likely going to hold
                    their value like government bonds or corporate bonds with a
                    rating of A or above as well as money in your bank account
                    or large cap stock funds or value stock funds – meaning
                    funds stocks that are not expensive. Less risky means funds
                    only and not individual stocks or corporate bonds.
                    Everything else is more-risky, including individual stocks
                    and individual corporate bonds and any bond fund with a
                    rating below A. Commodities and reits are also classified as
                    more-risky.
                  </Tooltip>
                )}
              </Overlay>
            </Col>
          </Row>

          <Form.Control
            as="select"
            defaultValue={props.previousData.risk}
            onChange={(e) => setField("risk", e.target.value)}
            isInvalid={!!errors.risk}>
            <option value="">Select the risk...</option>
            <option value="More risky">More risky</option>
            <option value="Less risky">Less risky</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.risk}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Comments <small>(Why is it a good investment?)</small>
          </Form.Label>
          <Form.Control
            as="textarea"
            defaultValue={props.previousData.comments}
            onChange={(e) => setField("comments", e.target.value)}
            isInvalid={!!errors.comments}
          />
          <Form.Control.Feedback type="invalid">
            {errors.comments}
          </Form.Control.Feedback>
        </Form.Group>

        <Col className="d-flex justify-content-end p-0">
          <Button type="submit" onClick={handleSubmit}>
            Edit Asset
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default EditStockForm;
