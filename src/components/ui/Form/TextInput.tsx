'use client';

import React from 'react';

import ValidationError from '../../errors/ValidationError';
import type { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
interface Props<T extends FieldValues>
  extends React.HTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  placeholder: string;
  type?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  id?: string;
  label?: string;
}

export default function TextInput<T extends FieldValues>({
  name,
  placeholder,
  type = 'text',
  register,
  id,
  label,
  errors,
  ...rest
}: Props<T>) {
  return (
    <>
      <div>
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          type={type}
          className="border-border focus:border-yellow border-gray/25 placeholder-gray/70 block w-full rounded-md border p-2.5 text-sm text-gray-900 focus:border-2 focus:outline-none"
          placeholder={placeholder}
          {...rest}
          {...register(name)}
          id={id}
        />

        <div>
          <ValidationError errors={errors} name={name} />
        </div>
      </div>
    </>
  );
}
