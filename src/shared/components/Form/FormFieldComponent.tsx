import { ErrorMessage, Field } from 'formik';
import React from 'react';
import { BaseInputNumber, BaseSelect } from 'shared/styled-components';
import { Input, TextArea } from '../Input';
import { TFormField } from './interface';
import { Select } from 'antd';
import EditorComponent from '../editor/EditorComponent';

const components: any = {
  Input: Input,
  InputNumber: BaseInputNumber,
  TextArea: TextArea,
  BaseSelect: BaseSelect,
  Select: Select,
  EditorComponent: EditorComponent
};

export const FormFieldComponent: React.FC<TFormField> = ({ formField, formik }) => {
  return (
    <div className="grid grid-cols-12 gap-2 ">
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
                <Field
                  key={field.nameField}
                  name={field.nameField}
                  id={field.nameField}
                  placeholder={field.placeholder}
                  options={field.options}
                  style={{ width: '100%' }}
                  className="w-full"
                  as={BaseSelect}
                  onChange={(value: string | number) => {
                    formik.setFieldValue(field.nameField, value);
                  }}
                />
                <ErrorMessage name={field.nameField}>
                  {(msg) => <div className="text-red-400 mt-1">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
          );
        }

        if (field.component === 'Select') {
          return (
            <div key={field.nameField} className={`${field.className || 'col-span-12'}`}>
              <div
                className="text-sm mb-2 font-semibold"
                dangerouslySetInnerHTML={{ __html: field.label || '' }}
              />
              <div className="grid col-span-6">
                <Field
                  key={field.nameField}
                  name={field.nameField}
                  id={field.nameField}
                  placeholder={field.placeholder}
                  options={field.options}
                  style={{ width: '100%' }}
                  className="w-full"
                  as={Select}
                  onChange={(value: string | number) => {
                    formik.setFieldValue(field.nameField, value);
                  }}
                />
                <ErrorMessage name={field.nameField}>
                  {(msg) => <div className="text-red-400 mt-1">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
          );
        }

        if (field.component === 'InputNumber') {
          return (
            <div key={field.nameField} className={`${field.className || 'col-span-12'}`}>
              <div
                className="text-sm mb-2 font-semibold"
                dangerouslySetInnerHTML={{ __html: field.label || '' }}
              />
              <div className="grid col-span-6">
                <Field
                  key={field.nameField}
                  name={field.nameField}
                  id={field.nameField}
                  placeholder={field.placeholder}
                  style={{ width: '100%' }}
                  className="w-full"
                  as={Component}
                  onChange={(value: number) => {
                    formik.setFieldValue(field.nameField, value);
                  }}
                />
                <ErrorMessage name={field.nameField}>
                  {(msg) => <div className="text-red-400 mt-1">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
          );
        }

        if (field.component === 'EditorComponent') {
          return (
            <div key={field.nameField} className={`${field.className || 'col-span-12'}`}>
              <div
                className="text-sm mb-2 font-semibold"
                dangerouslySetInnerHTML={{ __html: field.label || '' }}
              />
              <div className="grid col-span-6">
                <Field
                  key={field.nameField}
                  name={field.nameField}
                  id={field.nameField}
                  placeholder={field.placeholder}
                  style={{ width: '100%' }}
                  className="w-full"
                  as={Component}
                  onChange={(value: number) => {
                    formik.setFieldValue(`clone_${field.nameField}`, value);
                  }}
                />
                <ErrorMessage name={field.nameField}>
                  {(msg) => <div className="text-red-400 mt-1">{msg}</div>}
                </ErrorMessage>
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
              <Field
                key={field.nameField}
                name={field.nameField}
                id={field.nameField}
                minRows={field.minRows}
                placeholder={field.placeholder}
                style={{ width: '100%' }}
                className="w-full"
                as={Component}
                normalize={(value: string) => {
                  return value && parseFloat(value);
                }}
                disabled={field.disabled}
              />
              <ErrorMessage name={field.nameField}>
                {(msg) => <div className="text-red-400 mt-1">{msg}</div>}
              </ErrorMessage>
            </div>
          </div>
        );
      })}
    </div>
  );
};
