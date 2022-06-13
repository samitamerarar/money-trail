import { callback } from 'chart.js/helpers';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Picker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';

import { monthNames, monthNamesShort } from './helper.js';

const MonthPicker = ({ range, setChartDate, defaultDate }) => {
    const [isVisible, setVisibility] = useState(false);
    const [monthYear, setMonthYear] = useState(defaultDate);

    const showMonthPicker = (event) => {
        setVisibility(true);
        event.preventDefault();
    };

    const handleOnDismiss = () => {
        setVisibility(false);
    };

    const handleOnChange = (year, month) => {
        setMonthYear({ year, month });
        setChartDate({ year, month });
        setVisibility(false);
    };

    const getMonthValue = () => {
        const month = monthYear && monthYear.month ? monthNames[monthYear.month - 1] : 0;
        const year = monthYear && monthYear.year ? monthYear.year : 0;

        return month && year ? `${month} ${year}` : 'Select Month';
    };

    return (
        <Container className="p-0">
            <Row className="m-0 position-absolute" style={{ top: '-292.73px', left: 'calc(50% - 166.39px)', justifyContent: 'center' }}>
                <Picker
                    show={isVisible}
                    lang={monthNamesShort}
                    years={range}
                    value={monthYear}
                    onChange={handleOnChange}
                    onDismiss={handleOnDismiss}
                    theme="dark"
                />
            </Row>

            <Row className="m-0 mt-1 justify-content-center w-100 h-100">
                <Button variant="outline-dark" size="sm" onClick={showMonthPicker}>
                    {getMonthValue()}
                </Button>
            </Row>
        </Container>
    );
};

export default MonthPicker;
