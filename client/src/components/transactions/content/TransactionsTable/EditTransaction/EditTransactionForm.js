import moment from "moment";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const EditTransactionForm = (props) => {
  const [amountRendered, setAmountRendered] = useState();
  // Form
  const [form, setForm] = useState({
    id: props.previousData.id,
    merchant: props.previousData.merchant,
    category: props.previousData.category,
    amount: props.previousData.amount,
    date: props.previousData.date,
    type: props.previousData.type,
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
      props.sendFormData(form);
    }
  };

  const findFormErrors = () => {
    const { amount, category, date, merchant, type } = form;
    const newErrors = {};
    // amount errors
    if (!amount || amount > 999999 || amount <= 0)
      newErrors.amount = "must be a valid number!";

    // category errors
    if (!category || category === "") newErrors.category = "select a category!";

    // date errors
    if (!date) newErrors.date = "must have a date!";

    // merchant name errors
    if (!merchant || merchant === "") newErrors.merchant = "cannot be blank!";
    if (merchant && merchant.length > 50)
      newErrors.merchant = "merchant is too long! (50 characters max)";

    return newErrors;
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step=".01"
                placeholder="Amount"
                onChange={(e) => {
                  if (
                    e.target.value.indexOf(".") === -1 ||
                    e.target.value.indexOf(".") ===
                      e.target.value.toString().length - 3 ||
                    e.target.value.indexOf(".") ===
                      e.target.value.toString().length - 2
                  ) {
                    setField("amount", e.target.value);
                    setAmountRendered(e.target.value);
                  }
                }}
                value={amountRendered}
                isInvalid={!!errors.amount}
                defaultValue={props.previousData.amount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Col>
                <Form.Check
                  inline
                  type="radio"
                  label="Expense"
                  name="amount"
                  id="expense"
                  defaultChecked={props.previousData.type === "expense"}
                  onChange={(e) => setField("type", e.target.id)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Income"
                  name="amount"
                  id="income"
                  defaultChecked={props.previousData.type === "income"}
                  onChange={(e) => setField("type", e.target.id)}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>Merchant</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setField("merchant", e.target.value)}
            isInvalid={!!errors.merchant}
            defaultValue={props.previousData.merchant}
          />
          <Form.Control.Feedback type="invalid">
            {errors.merchant}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Transaction Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            defaultValue={moment(props.previousData.date, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            )}
            isInvalid={!!errors.date}
            onChange={(e) => {
              setField("date", moment(e.target.value).format("DD/MM/YYYY"));
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.date}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            defaultValue={props.previousData.category}
            onChange={(e) => setField("category", e.target.value)}
            isInvalid={!!errors.category}>
            <option value="">Select a category...</option>
            <option value="automobile">Automobile</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
            <option value="fun">Fun</option>
            <option value="electronics">Electronics</option>
            <option value="amenities">Amenities</option>
            <option value="personal">Personal</option>
            <option value="medical">Medical</option>
            <option value="other">Other</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.category}
          </Form.Control.Feedback>
        </Form.Group>

        <Col className="d-flex justify-content-end p-0">
          <Button type="submit" onClick={handleSubmit}>
            Edit Transaction
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default EditTransactionForm;
