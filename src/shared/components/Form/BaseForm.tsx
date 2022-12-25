import React from 'react';
import { BaseInputNumber, BaseSelect } from 'shared/styled-components';
import { Input, TextArea } from '../Input';
import { TFormField } from './interface';

const components: any = {
  Input: Input,
  BaseInputNumber: BaseInputNumber,
  TextArea: TextArea,
  BaseSelect: BaseSelect
};

export const BaseForm: React.FC<TFormField> = ({ formField, formik }) => {
  return (
    <div className="grid grid-cols-12 gap-x-2 gap-y-4">
      {Object.keys(formField).map((key: string) => {
        const field = formField[key];
        const Component = components[field.component || 'Input'];

        if (field.component === 'BaseSelect') {
          return (
            <div key={field.nameField} className={`${field.className || 'col-span-12'}`}>
              <div
                className="text-sm mb-2 font-semibold"
                dangerouslySetInnerHTML={{ __html: field.label || '' }}
              />
              <div className="grid col-span-6">
                <Component
                  className="w-full"
                  options={field.options}
                  placeholder={field.placeholder}
                  value={formik.values[field.nameField]}
                  id={field.nameField}
                  onChange={(value: any) => formik.setFieldValue(field.nameField, value)}
                />
              </div>
            </div>
          );
        }

        return (
          <div key={field.nameField} className={`${field.className || 'col-span-12'}`}>
            <div
              className="text-sm mb-2 font-semibold"
              dangerouslySetInnerHTML={{ __html: field.label || '' }}
            />
            <div className="grid col-span-6">
              <Component
                className="w-full"
                style={{ width: '100%' }}
                placeholder={field.placeholder}
                value={formik.values[field.nameField]}
                id={field.nameField}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
