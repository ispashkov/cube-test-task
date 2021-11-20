import * as React from 'react';
import clsx from 'clsx';

import { useControlled } from "../../hooks/use-controlled";

import classes from './checkbox.module.css'

interface Props {
  className?: string;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (newValue: boolean) => void;
  testId?: string
}

export const Checkbox: React.FC<Props> = (props) => {
  const { className } = props;
  const { testId } = props
  const { value: controlled, defaultValue, onChange } = props

  const [value, setValue] = useControlled<boolean>({
    controlled,
    defaultValue,
  })

  const onChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target

    setValue(checked)

    if (onChange) {
      onChange(checked)
    }
  }, [onChange, setValue])

  return (
    <label className={clsx(classes.checkbox, {[classes.checked]: value,}, className)} data-testid={testId}>
      <input className={classes.input} type="checkbox" checked={value} onChange={onChangeHandler} />
      <div className={classes.box} />
    </label>
  );
};
