import React, { useState, useEffect } from 'react';
import { Box, FormControl, Tooltip, TextField, Checkbox, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';


const RangeInputFields = ({ inputState, setInputState, index, rangeValues, min, max, setIsValidInput, setRangeValues }) => {

    // Local State for Start Field Error Status and Message
    const [startInputError, setStartInputError] = useState({ error: false, message: '' });
    // Local State for End Field Error Status and Message
    const [endInputError, setEndInputError] = useState({ error: false, message: '' });


    // Check if input is a number
    const isNotNumber = (number) => {
        let isNotNumber = false;
        isNotNumber = isNaN(number) || number === "" || number === undefined || number === null ? true : false;
        return isNotNumber;
    }

    // Check if number is out of range
    const isNumberOutOfRange = (number, min, max) => {
        let isOutOfRange = false;
        isOutOfRange = number < min || number > max ? true : false;
        return isOutOfRange;
    }

    // Check if number already exists in range
    const isNumberAlreadyExists = (number) => {
        let isExists = false;
        const numberNotInRangeValues = rangeValues[number] === undefined;

        const numberIsNotStartNumber = inputState[index].start.value !== number;
        const numberIsNotEndNumber = inputState[index].end.value !== number;

        isExists = numberNotInRangeValues && numberIsNotStartNumber && numberIsNotEndNumber ? true : false;
        return isExists;
    }

    // check if number is in some range
    const isNumberInSomeRange = (number, inclusiveStatus) => {
        let isInSomeRange = false;
        inputState.map((range, i) => {
            // If number comes in some other range
            if (range.start.value < number && range.end.value > number && i !== index) {
                isInSomeRange = true;
            }
            // If number is equal to start number and start number is not inclusive
            else if (range.start.value == number && range.start.inclusive === inclusiveStatus && i !== index) {
                isInSomeRange = true;
            }
            // If number is equal to end number and end number is not inclusive
            else if (range.end.value == number && range.end.inclusive === inclusiveStatus && i !== index) {
                isInSomeRange = true;
            }
        })
        return isInSomeRange;
    }

    // Check if Number is valid
    const isNumberValid = (number) => {

        let isValid = true;
        let message = '';
        let nanValue = false;

        if (isNotNumber(number.value)) {
            isValid = false;
            message = "Not a Valid Number";
            nanValue = true;
        }
        else if (isNumberOutOfRange(number.value, min, max)) {
            isValid = false;
            message = `Number should be between ${min} and ${max}`;
        }
        else if (isNumberAlreadyExists(number.value)) {
            isValid = false;
            message = `Number already exists`;
        }
        else if (inputState[index].start.value >= inputState[index].end.value) {
            isValid = false;
            message = `Start Number should be less than End Number`;
        }
        else if (isNumberInSomeRange(number.value, number.inclusive)) {
            isValid = false;
            message = `Number is in Some Range`;
        }

        setIsValidInput(isValid);
        // console.log("validVState", inputState, rangeValues);
        return { error: !isValid, message: message, nanValue: nanValue };
    }

    // Chnage handler for Start input field
    const handleStartChange = (e) => {
        const value = e.target.value;
        let validValue = 0;
        // console.log("validValue", validValue, inputState[index].start.value);

        if (isNotNumber(value)) {
            setStartInputError({ error: true, message: "Not a Valid Number" });
            setRangeValues((prevState) => {
                const newState = { ...prevState };
                const prevValueList = newState[inputState[index].start.value] === undefined ? [] : newState[inputState[index].start.value];
                const indexOfPrevValue = prevValueList.indexOf(inputState[index].start.inclusive);
                prevValueList.splice(indexOfPrevValue, 1);
                if (prevValueList.length === 0) {
                    delete newState[inputState[index].start.value];
                }
                else {
                    newState[inputState[index].start.value] = prevValueList;
                }
                return newState;
            });
        } else {
            validValue = Number(value);
            setRangeValues((prevState) => {
                const newState = { ...prevState };
                const prevValueList = newState[inputState[index].start.value] === undefined ? [] : newState[inputState[index].start.value];
                const prevStateValidValueList = newState[validValue] === undefined ? [] : newState[validValue];

                // If number has two occurences in rangeValues
                if (prevValueList.length > 1) {
                    const indexOfPrevValue = prevValueList.indexOf(inputState[index].start.inclusive);
                    prevValueList.splice(indexOfPrevValue, 1);
                }
                else {
                    delete newState[inputState[index].start.value];
                }

                prevStateValidValueList.push(inputState[index].start.inclusive);
                newState[validValue] = prevStateValidValueList;
                return newState;
            });
        }
        setInputState((prevState) => {
            const newState = [...prevState];
            newState[index].start.value = validValue;
            return newState;
        });

    };

    // Chnage handler for Start inclusive checkbox
    const handleStartInclusiveChange = (e) => {
        const value = e.target.checked;
        setInputState((prevState) => {
            const newState = [...prevState];
            newState[index].start.inclusive = value;
            return newState;
        });
        setRangeValues((prevState) => {
            const newState = { ...prevState };
            const prevValue = newState[inputState[index].start.value];
            const indexOfPrevOppositeValue = prevValue.indexOf(!value);
            prevValue[indexOfPrevOppositeValue] = value;
            return newState;
        });
    };

    // Chnage handler for End input field
    const handleEndChange = (e) => {
        const value = e.target.value;
        let validValue = 0;
        // console.log("validValue", validValue, inputState[index].end.value);

        if (isNotNumber(value)) {
            setStartInputError({ error: true, message: "Not a Valid Number" });
            setRangeValues((prevState) => {
                const newState = { ...prevState };
                const prevValueList = newState[inputState[index].end.value] === undefined ? [] : newState[inputState[index].end.value];
                const indexOfPrevValue = prevValueList.indexOf(inputState[index].end.inclusive);
                prevValueList.splice(indexOfPrevValue, 1);
                if (prevValueList.length === 0) {
                    delete newState[inputState[index].end.value];
                }
                else {
                    newState[inputState[index].end.value] = prevValueList;
                }
                return newState;
            });   
        }
        else {

            validValue = Number(value);

            setRangeValues((prevState) => {
                const newState = { ...prevState };
                const prevValueList = newState[inputState[index].end.value] === undefined ? [] : newState[inputState[index].end.value];
                const prevStateValidValueList = newState[validValue] === undefined ? [] : newState[validValue];

                // If number has two occurences in rangeValues
                if (prevValueList.length > 1) {
                    const indexOfPrevValue = prevValueList.indexOf(inputState[index].end.inclusive);
                    prevValueList.splice(indexOfPrevValue, 1);
                }
                else {
                    delete newState[inputState[index].end.value];
                }
                prevStateValidValueList.push(inputState[index].end.inclusive);
                newState[validValue] = prevStateValidValueList;
                return newState;
            });
        }
        setInputState((prevState) => {
            const newState = [...prevState];
            newState[index].end.value = validValue;
            return newState;
        });
    };

    // Chnage handler for End inclusive checkbox
    const handleEndInclusiveChange = (e) => {
        const value = e.target.checked;
        setInputState((prevState) => {
            const newState = [...prevState];
            newState[index].end.inclusive = value;
            return newState;
        });
        setRangeValues((prevState) => {
            const newState = { ...prevState };
            const prevValue = newState[inputState[index].end.value];
            const indexOfPrevOppositeValue = prevValue.indexOf(!value);
            prevValue[indexOfPrevOppositeValue] = value;
            return newState;
        });
    };

    // Chnage handler for Category Name input field
    const handleCategoryNameChange = (e) => {
        const value = e.target.value;
        setInputState((prevState) => {
            const newState = [...prevState];
            newState[index].categoryName = value;
            return newState;
        });
    };

    // UseEffect to check if Start and End input are valid
    useEffect(() => {

        const startResult = isNumberValid(inputState[index].start);
        const endResult = isNumberValid(inputState[index].end);
        setStartInputError(startResult);
        setEndInputError(endResult);

    }, [inputState]);


    return (
        <>
            {/* Start of Range Input Field */}
            <Box sx={{ width: "17%", mr: 4 }}>
                <FormControl fullWidth size="small">
                    <InputLabel htmlFor="outlined-adornment-start">Start</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-start"
                        type='text'
                        sx={{ pr: 0 }}
                        inputProps={{ inputMode: 'numeric' }}
                        value={inputState[index].start.value}
                        onChange={handleStartChange}
                        error={startInputError.error}
                        endAdornment={
                            <InputAdornment position="end">
                                <Tooltip title="Check if you want Inclusive Start" placement="top">
                                    <Checkbox disabled={startInputError.nanValue} checked={inputState[index].start.inclusive} onChange={handleStartInclusiveChange} />
                                </Tooltip>
                            </InputAdornment>
                        }
                        label="Start"
                    />
                    < FormHelperText error={startInputError.error}>{startInputError.message}</FormHelperText>
                </FormControl>
            </Box>
            {/* Start of Range Input Field */}
            <Box sx={{ width: "17%", mr: 4 }}>
                <FormControl fullWidth size="small">
                    <InputLabel htmlFor="outlined-adornment-end">End</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-end"
                        type='text'
                        sx={{ pr: 0 }}
                        inputProps={{ inputMode: 'numeric' }}
                        value={inputState[index].end.value}
                        onChange={handleEndChange}
                        error={endInputError.error}
                        endAdornment={
                            <InputAdornment position="end">
                                <Tooltip title="Check if you want Inclusive End" placement="top">
                                    <Checkbox disabled={endInputError.nanValue} checked={inputState[index].end.inclusive} onChange={handleEndInclusiveChange} />
                                </Tooltip>
                            </InputAdornment>
                        }
                        label="End"
                    />
                    < FormHelperText error={endInputError.error}>{endInputError.message}</FormHelperText>
                </FormControl>
            </Box>

            {/* Category Name Input Field */}
            <Box sx={{ width: "20%", mr: 5 }}>
                <FormControl fullWidth size="small">
                    <TextField
                        fullWidth={true}
                        id="outlined-basic3"
                        label="Category Name"
                        size="small"
                        variant="outlined"
                        value={inputState[index].categoryName}
                        onChange={handleCategoryNameChange}
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default RangeInputFields;