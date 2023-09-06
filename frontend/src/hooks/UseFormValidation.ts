import { useState, useCallback, ChangeEvent } from 'react';

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({
    title: '',
    gameMaster: '',
    result: '',
    date: '',
    mafia: [],
    done: '',
    sheriff: '',
    peace: [],
    bestPlayer: [],
    modKill: [],
    name: ''
  });
  const [errors, setErrors] = useState({
   
  name: ''});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (
      name === 'mafia' ||
      name === 'peace' ||
      name === 'bestPlayer' ||
      name === 'modKill'
    ) {
      setValues({ ...values, [name]: [...values[name], value] });
    } else {
      setValues({ ...values, [name]: value });
    }
     setErrors({
      ...errors,
      [name]: target.validationMessage,
    });

    setIsValid(
      target.closest('form') ? target.closest('form').checkValidity() : false
    );
  };

  const resetForm = useCallback(
    (
      newValues = {
        title: '',
        gameMaster: '',
        result: '',
        date: '',
        mafia: [],
        done: '',
        sheriff: '',
        peace: [],
        bestPlayer: [],
        modKill: [],
        name: ''
      },
      newErrors = {
        
        name: '',
      },
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const handleRemove = (id: string, field: string) => {
    if (
      field === 'mafia' ||
      field === 'peace' ||
      field === 'bestPlayer' ||
      field === 'modKill'
    ) {
      setValues({
        ...values,
        [field]: values[field].filter((playerId: string) => {
          return playerId !== id;
        }),
      });
    } else {
      setValues({ ...values, [field]: '' });
    }
  }

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    handleRemove
  };
}
