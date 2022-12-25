export const ProcessorStatus = {
  Succeeded: 'Succeeded',
  Processing: 'Processing',
  Failed: 'Failed'
};

export const WalletLevel = {
  Limited: 'Limited',
  Confirmed: 'Confirmed'
};

export const WalletCurrency = {
  VND: 'VND',
  USD: 'USD'
};
export const TransactionType = {
  Authorize: 'Authorize',
  Capture: 'Capture',
  Topup: 'Topup',
  Purchase: 'Purchase'
};

export const TransactionStatus = {
  Success: 'Success',
  Processing: 'Processing',
  Cancel: 'Cancel',
  Error: 'Error'
};

export const OrderStatus = {
  Active: 'Active',
  InActive: 'InActive'
};
export const PaymentMethod = {
  Wallet: 'Walet',
  Card: 'Card'
};

export const PaymentSubMethod = {
  TraletWallet: 'TraletWallet',
  CreditCard: 'CreditCard'
};
export const ReferenceType = {
  Topup: 'Topup',
  FoodOrder: 'FoodOrder'
};

export const NamespacesPolicies: Record<string, string> = {
  TraletAdmins: 'tralet-admins',
  TraletMerchantAdmins: 'tralet-merchant-admins',
  TraletMerchantMembers: 'tralet-merchant-members',
  TraletCustomer: 'tralet-customers'
};
export const STATUS_COLOR: Record<string, string> = {
  red: 'bg-red-100 text-red-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600'
};

export const STATUS_TYPES: Record<string, Record<string, string>> = {
  Processing: { text: 'Processing', typeColor: STATUS_COLOR.blue },
  Success: { text: 'Success', typeColor: STATUS_COLOR.green },
  Active: { text: 'Active', typeColor: STATUS_COLOR.green },
  Approved: { text: 'APPROVED', typeColor: STATUS_COLOR.green },
  Error: { text: 'Error', typeColor: STATUS_COLOR.red },
  InActive: { text: 'InActive', typeColor: STATUS_COLOR.red }
};

export const MAX_FOOD_OPTIONS = 5;
export const MIN_FODD_OPTIONS = 1;
export const DEFAULT_GROUP_OPTION = { name: '', items: [{}], required: false };

export const SCANQRTYPES = {
  storeOrder: 'store_order'
};
