import React from 'react';
import { AutoComplete } from './AutoComplete';

export default function DemoInput() {
  return (
    <div>
      <AutoComplete
        placeholder="Enter and select vegetable"
        options={[
          { value: 'Banana', label: 'Banana' },
          { value: 'Apple', label: 'Apple' },
          { value: 'Lemon', label: 'Lemon' },
          { value: 'Left', label: 'Left' }
        ]}
        onSelect={(value: string, option: object) => {
          console.log(value, option);
        }}
        onChange={(value: string) => {
          console.log(value);
        }}
        onSearch={(value: string) => {
          console.log(value);
        }}
      />
    </div>
  );
}
