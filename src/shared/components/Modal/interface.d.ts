type ModalType = {
  children?: React.ReactNode;
  visible: boolean;
  closable?: boolean;
  title?: string | React.ReactNode;
  width?: string;
  onCancel?: () => void;
};
