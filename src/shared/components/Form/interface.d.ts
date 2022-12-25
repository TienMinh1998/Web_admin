export type TField = {
  nameField: string;
  className?: string;
  label?: string;
  component: string;
  placeholder?: string;
  options?: Array<any>;
  rule?: any;
  handleValue?: () => void;
};

export type TFormField = {
  formField: Record<string, TField>;
  formik: any;
};
