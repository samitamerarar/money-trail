import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
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
        <Container>
            <Button variant="outline-dark" size="sm" onClick={showMonthPicker}>
                {getMonthValue()}
            </Button>
            <Picker
                show={isVisible}
                lang={monthNamesShort}
                years={range}
                value={monthYear}
                onChange={handleOnChange}
                onDismiss={handleOnDismiss}
                theme="dark"
            />
        </Container>
    );
};

export default MonthPicker;
