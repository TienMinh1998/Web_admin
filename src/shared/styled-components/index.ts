import { InputNumber, Select } from 'antd';
import styled from 'styled-components';

export const BaseSelect = styled(Select)`
  .ant-select-selector {
    border-radius: 4px !important;
  }
`;

export const BaseInputNumber = styled(InputNumber)`
  .ant-input-number {
    border-radius: 4px !important;
  }
  .ant-input-number-input {
    border-radius: 16px !important;
  }
`;
