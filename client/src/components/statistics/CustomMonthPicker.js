import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import MonthPicker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';

import { monthNames, monthNamesShort } from './helper.js';

const CustomMonthPicker = ({ range, setChartDate, defaultDate }) => {
    const [monthYear, setMonthYear] = useState(defaultDate);
    const monthPickerRef = React.useRef(null);

    const handleOnChange = (year, month) => {
        setMonthYear({ year, month });
        setChartDate({ year, month });
        hidePicker();
    };

    const getMonthValue = () => {
        const month = monthYear && monthYear.month ? monthNames[monthYear.month - 1] : 0;
        const year = monthYear && monthYear.year ? monthYear.year : 0;

        return month && year ? `${month} ${year}` : 'Select Month';
    };

    const showPicker = () => {
        if (monthPickerRef && monthPickerRef.current) {
            monthPickerRef.current.show();
        }
    };

    const hidePicker = () => {
        if (monthPickerRef && monthPickerRef.current) {
            monthPickerRef.current.dismiss();
        }
    };

    return (
        <Container className="p-0">
            <Row className="m-0 position-absolute" style={{ top: '-292.73px', left: 'calc(50% - 166.39px)', justifyContent: 'center' }}>
                <MonthPicker ref={monthPickerRef} lang={monthNamesShort} years={range} value={monthYear} onChange={handleOnChange} theme="dark"></MonthPicker>
            </Row>

            <Row className="m-0 mt-1 justify-content-center w-100 h-100">
                <Button variant="secondary" size="sm" onClick={showPicker}>
                    {getMonthValue()}
                </Button>
            </Row>
        </Container>
    );
};

export default CustomMonthPicker;
