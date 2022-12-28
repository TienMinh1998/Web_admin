import { RcFile } from 'antd/lib/upload';

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  const res = reader.readAsDataURL(img);
};
