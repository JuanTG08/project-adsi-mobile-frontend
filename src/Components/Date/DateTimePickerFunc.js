import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const DateTimePickerFunc = ({ dateStart, typePicker, setDateChange }) => {
    const [date, setDate] = useState(new Date(Date.parse(dateStart || '2022-01-02')));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDateChange(currentDate);
    };

    const ShowMode = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: typePicker,
            is24Hour: true
        })
        return <></>;
    };

    const ShowDatepicker = () => {
        showMode(typePicker);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <ShowMode />
    );
}

export default DateTimePickerFunc;
