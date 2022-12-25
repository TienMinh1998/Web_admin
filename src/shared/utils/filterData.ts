import {
  NamespacesPolicies,
  OrderStatus,
  PaymentMethod,
  TransactionStatus,
  TransactionType
} from './CONSTANT';

export const TRANSACTION_TYPE = Object.keys(TransactionType).map((x) => ({ label: x, value: x }));
export const TRANSACTION_STATUS = Object.keys(TransactionStatus).map((x) => ({
  label: x,
  value: x
}));
export const ORDER_STATUS = Object.keys(OrderStatus).map((x) => ({
  label: x,
  value: x
}));

export const NAMESPACE_POLICIES = Object.keys(NamespacesPolicies).map((key: string) => ({
  label: NamespacesPolicies[key],
  value: NamespacesPolicies[key]
}));
export const PAYMENT_METHOD = Object.keys(PaymentMethod).map((x) => ({ label: x, value: x }));
export const CREATE_DATE = [
  { label: 'Last 7 days', value: 1 },
  { label: 'Last 30 days', value: 2 },
  { label: 'Specific date range', value: 3 }
];
