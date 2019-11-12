import { useState } from 'react';
import { get, omit } from 'lodash';

interface IUseForm<T = any> {
  (initValue: T): void;
}

interface ITest {
  name: string;
  age: number;
}

export function useForm<T extends {}>(initValue: T) {
  const [formValue, _setFormValue] = useState<T>(initValue);
  const getFormValue = (value?: keyof typeof initValue) => {
    if (value) {
      return formValue[value];
    } else {
      return formValue;
    }
  };
  const setFormValue = (key: keyof T, value: T[keyof T]) => {
    const res = omit(formValue, key);
    // @ts-ignore
    _setFormValue({ ...res, [key]: value });
  };
  return { formValue, getFormValue, setFormValue };
}
