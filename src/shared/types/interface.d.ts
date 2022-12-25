export interface InputProps {
  id?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  prefix?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onPressEnter?: () => void;
}

export interface IInputSearch {
  id?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  enterPress?: boolean;
  onChange?: (e: any) => void;
  onSearch: () => void;
}
export interface InputPasswordProps {
  id?: string;
  value?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  visibilityToggle?: boolean;
  className?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onPressEnter?: () => void;
}

export interface TextAreaProps {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
  showCount?: boolean;
  maxLength?: number;
  bordered?: boolean;
  className?: string;
  onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  onPressEnter?: () => void;
}

export type TGroupMenu = {
  titleGroup?: string;
  groupMenu: Array<TSubMenu>;
  keyGroup: string;
};

export type TSubMenu = {
  title: string;
  icon?: React.ReactNode;
  to: string;
  childrens?: Array<SubMenu>;
};

//Table
export interface TableProps {
  columns: Array<IColumn>;
  dataSource: Array<object>;
  customClass?: string;
  onClickRow?: () => void;
  loading?: boolean;
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  paging?: IPaging;
  rowSelection?: any;
  height?: number;
}

export type TRowSelection = {
  onChange: (selectedKey: string | number, record: any) => void;
  getCheckboxProps?: (record: any) => any;
};

export type RowType = {
  row: Array<string | number | object>;
  recordRow: unknown;
  rowSelection?: boolean;
  onItemCheck?: (item) => void;
  onClickRow?: () => void;
  loading?: boolean;
};

export interface IColumn {
  title: string;
  keyData: string;
  width?: number;
  render?: (value: any, index: number, record: object) => JSX.Element;
}

export interface IPaging {
  currentPage?: number;
  pageSize?: number;
  total?: number;
  onChangePage?: (page: number) => void;
}
export interface IPagination extends IPaging {
  buttonConst?: number;
  siblingCount?: number;
  totalPageCount?: number;
  position?: 'left' | 'center' | 'right';
}

export interface IAutoComplete {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  options: { value: any; label: string }[];
  defaultOpen?: boolean;
  onChange?: (value: string) => void;
  onSelect?: (value: string, option: object) => void;
  onSearch?: (value: string) => void;
}

export type UploadImageResponse = {
  Bucket: string;
  ETag: string;
  Key: string;
  Location: string;
  correlationId: string;
  key: string;
};

export type RequestDeleteResponse = {
  stauts: boolean;
};
