import {
    useState,
    useCallback,
    ChangeEvent
} from 'react';

//хук управления формой и валидации формы
export function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({
            ...values,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: target.validationMessage
        });
        
        setIsValid(target.closest("form") ? target.closest("form").checkValidity() : false);
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {
        values,
        handleChange,
        errors,
        isValid,
        resetForm
    };
}