import React, { useState, useRef } from 'react';
import { Form, Button, Container, Row, Col, Overlay, Tooltip, OverlayTrigger } from 'react-bootstrap';
import SearchTicker from './SearchTicker';

const AddAssetForm = (props) => {
    const [priceRendered, setPriceRendered] = useState();
    // Form
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    // Tooltip
    const [showSectorsDrivers, setShowSectorsDrivers] = useState(false);
    const targetSectorsDrivers = useRef(null);
    const [showRisk, setShowRisk] = useState(false);
    const targetRisk = useRef(null);

    const setField = async (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field])
            setErrors({
                ...errors,
                [field]: null
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
        const { symbolNameObj, sector, price, shares, date, comments, risk } = form;
        const newErrors = {};
        // symbol object errors
        if (!symbolNameObj || !symbolNameObj.symbol) newErrors.symbolNameObj = 'cannot be blank!';
        else if (!symbolNameObj || !symbolNameObj.shortname) newErrors.symbolNameObj = 'please choose a valid symbol!';
        // price errors
        if (!price || price > 999999 || price <= 0) newErrors.price = 'must be a valid number!';
        // shares errors
        if (!shares || shares > 999999 || shares <= 0) newErrors.shares = 'must be a valid number!';
        // date errors
        if (!date) newErrors.date = 'must have a date!';
        // sector errors
        if (!sector || sector === '') newErrors.sector = 'select a sector!';
        // risk errors
        if (!risk || risk === '') newErrors.risk = 'select a risk!';

        // comments errors
        //if (!comments || comments === "") newErrors.comments = "cannot be blank!";
        if (comments && comments.length > 200) newErrors.comments = 'comments are too long! (200 characters max)';

        return newErrors;
    };

    const setSelectedSymbol = (selectedSymbol) => {
        if (selectedSymbol && selectedSymbol[0] && selectedSymbol[0].shortname && selectedSymbol[0].symbol) {
            setField('symbolNameObj', selectedSymbol[0]);
        } else {
            setPriceRendered();
            setForm({});
            setErrors({});
            setShowSectorsDrivers(false);
            setShowRisk(false);
        }
    };

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Search</Form.Label>

                    <SearchTicker getSelected={(e) => setSelectedSymbol(e)} isInvalid={!!errors.symbolNameObj} disabled={form.symbolNameObj} />
                    <Form.Control.Feedback type="invalid">{errors.symbolNameObj}</Form.Control.Feedback>
                </Form.Group>

                {form.symbolNameObj && (
                    <>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Share(s) bought</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="# Share(s)"
                                        onChange={(e) => setField('shares', e.target.value)}
                                        isInvalid={!!errors.shares}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.shares}</Form.Control.Feedback>
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
                                                e.target.value.indexOf('.') === -1 ||
                                                e.target.value.indexOf('.') === e.target.value.toString().length - 3 ||
                                                e.target.value.indexOf('.') === e.target.value.toString().length - 2
                                            ) {
                                                setField('price', e.target.value);
                                                setPriceRendered(e.target.value);
                                            }
                                        }}
                                        value={priceRendered}
                                        isInvalid={!!errors.price}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group>
                            <Form.Label>Date of purchase</Form.Label>
                            <Form.Control type="date" name="date" isInvalid={!!errors.date} onChange={(e) => setField('date', e.target.value)} />
                            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
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
                                    <Overlay target={targetSectorsDrivers.current} show={showSectorsDrivers} placement="left">
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

                            <Form.Control as="select" onChange={(e) => setField('sector', e.target.value)} isInvalid={!!errors.sector}>
                                <option value="">Select a sector...</option>
                                <option value="Consumer Discretionary">Consumer Discretionary</option>
                                <option value="Consumer Staples">Consumer Staples</option>
                                <option value="Financials">Financials</option>
                                <option value="Health Care">Health Care</option>
                                <option value="Industrials">Industrials</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Materials">Materials</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Telecommunications Services">Telecommunications Services</option>
                                <option value="Utilities">Utilities</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.sector}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Label className="mb-3">Helpful Questions</Form.Label>
                        <Form.Group>
                            <Row>
                                <Col sm={8}>
                                    <Form.Check
                                        disabled
                                        checked
                                        required
                                        name="checkbox1"
                                        type="checkbox"
                                        label="If this is an ETF, did you get a reasonably low fee? (hidden fees?)"
                                        isInvalid={!!errors.checkbox1}
                                        feedback={errors.checkbox1}
                                    />
                                </Col>
                                <Col className="d-flex justify-content-end" sm={4}>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={
                                            <Tooltip id="button-tooltip-2">
                                                If you don't know what the fees are, either read the ETF investment prospectus (if applicable) or call the
                                                company that issued the ETF or other fund type as you have the right to know how they are charging you.
                                            </Tooltip>
                                        }>
                                        {({ ref, ...triggerHandler }) => (
                                            <Button variant="warning" ref={ref} {...triggerHandler} className="d-inline-flex align-items-center" size="sm">
                                                Info
                                            </Button>
                                        )}
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col sm={8}>
                                    <Form.Check
                                        disabled
                                        checked
                                        required
                                        name="checkbox2"
                                        type="checkbox"
                                        label="If this is a stock, did you try the product or service?"
                                        isInvalid={!!errors.checkbox2}
                                        feedback={errors.checkbox2}
                                    />
                                </Col>
                                <Col className="d-flex justify-content-end" sm={4}>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={
                                            <Tooltip id="button-tooltip-2">
                                                Invest in what you understand as it will really help you with your investment research.
                                            </Tooltip>
                                        }>
                                        {({ ref, ...triggerHandler }) => (
                                            <Button variant="warning" ref={ref} {...triggerHandler} className="d-inline-flex align-items-center" size="sm">
                                                Info
                                            </Button>
                                        )}
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col sm={8}>
                                    <Form.Check
                                        disabled
                                        checked
                                        required
                                        name="checkbox3"
                                        type="checkbox"
                                        label="If this is a stock, are you comfortable with the valuation?"
                                        isInvalid={!!errors.checkbox3}
                                        feedback={errors.checkbox3}
                                    />
                                </Col>
                                <Col className="d-flex justify-content-end" sm={4}>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={
                                            <Tooltip id="button-tooltip-2">
                                                Is the P/E too high? If so, is it because the company is growing quickly? We all have different investment
                                                philosophies. Some of us buy cheap stocks with a low Price to Book ratio (like "Value Investors" like Warren
                                                Buffett) and others like expensive stocks like Amazon as they are growing quickly ("Growth Investors"). We are
                                                all different. Just know what style you prefer.
                                            </Tooltip>
                                        }>
                                        {({ ref, ...triggerHandler }) => (
                                            <Button variant="warning" ref={ref} {...triggerHandler} className="d-inline-flex align-items-center" size="sm">
                                                Info
                                            </Button>
                                        )}
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col sm={8}>
                                    <Form.Check
                                        disabled
                                        checked
                                        required
                                        name="checkbox4"
                                        type="checkbox"
                                        label="Did you read the prospectus (ETF) or the annual report (stock)?"
                                        isInvalid={!!errors.checkbox4}
                                        feedback={errors.checkbox4}
                                    />
                                </Col>
                                <Col className="d-flex justify-content-end" sm={4}>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={
                                            <Tooltip id="button-tooltip-2">
                                                You can access the prospectus by calling the company that you bought the investment from or by going to the
                                                website of the ETF company (i.e., Vanguard.com). If you want access to the annual report for a stock, go to that
                                                company's website and search for "Annual Report".
                                            </Tooltip>
                                        }>
                                        {({ ref, ...triggerHandler }) => (
                                            <Button variant="warning" ref={ref} {...triggerHandler} className="d-inline-flex align-items-center" size="sm">
                                                Info
                                            </Button>
                                        )}
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col sm={8}>
                                    <Form.Check
                                        disabled
                                        checked
                                        required
                                        name="checkbox5"
                                        type="checkbox"
                                        label="Aware of benefits if investment is in a retirement account?"
                                        isInvalid={!!errors.checkbox5}
                                        feedback={errors.checkbox5}
                                    />
                                    {errors.checkboxes}
                                </Col>
                                <Col className="d-flex justify-content-end" sm={4}>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={
                                            <Tooltip id="button-tooltip-2">
                                                Make sure that this investment is in your retirement account if you have room in your retirement account and if
                                                your country has retirement savings account benefits (for tax savings purposes).
                                            </Tooltip>
                                        }>
                                        {({ ref, ...triggerHandler }) => (
                                            <Button variant="warning" ref={ref} {...triggerHandler} className="d-inline-flex align-items-center" size="sm">
                                                Info
                                            </Button>
                                        )}
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mt-4">
                            <Row>
                                <Col>
                                    <Form.Label>Investment Risk</Form.Label>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <Button className="mb-1" variant="info" ref={targetRisk} onClick={() => setShowRisk(!showRisk)} size="sm">
                                        <small>Toggle Risk Info</small>
                                    </Button>
                                    <Overlay target={targetRisk.current} show={showRisk} placement="left">
                                        {(props) => (
                                            <Tooltip {...props}>
                                                Less risky consists of investments that are more likely going to hold their value like government bonds or
                                                corporate bonds with a rating of A or above as well as money in your bank account or large cap stock funds or
                                                value stock funds – meaning funds stocks that are not expensive. Less risky means funds only and not individual
                                                stocks or corporate bonds. Everything else is more risky, including individual stocks and individual corporate
                                                bonds and any bond fund with a rating below A. Commodities and reits are also classified as more-risky.
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                </Col>
                            </Row>

                            <Form.Control as="select" onChange={(e) => setField('risk', e.target.value)} isInvalid={!!errors.risk}>
                                <option value="">Select the risk...</option>
                                <option value="More risky">More risky</option>
                                <option value="Less risky">Less risky</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.risk}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Comments <small>(Why is it a good investment?)</small>
                            </Form.Label>
                            <Form.Control as="textarea" onChange={(e) => setField('comments', e.target.value)} isInvalid={!!errors.comments} />
                            <Form.Control.Feedback type="invalid">{errors.comments}</Form.Control.Feedback>
                        </Form.Group>
                        <Col className="d-flex justify-content-end p-0">
                            <Button type="submit" onClick={handleSubmit}>
                                Add Asset
                            </Button>
                        </Col>
                    </>
                )}
            </Form>
        </Container>
    );
};

export default AddAssetForm;
