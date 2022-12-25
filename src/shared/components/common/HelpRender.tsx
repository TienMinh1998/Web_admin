import { STATUS_TYPES } from 'shared/utils/CONSTANT';

export const renderStatus = (status: string) => {
  return (
    <span
      className={`${
        STATUS_TYPES[status] && STATUS_TYPES[status].typeColor
      } p-2 font-semibold text-center rounded`}>
      {STATUS_TYPES[status] && STATUS_TYPES[status].text}
    </span>
  );
};

export const renderDisableUser = (value: boolean) => {
  switch (value) {
    case false:
      return (
        <div className="bg-green-100 text-green-600 p-1 font-semibold text-center rounded">
          Active
        </div>
      );
    case true:
      return (
        <div className="bg-red-100 text-red-600 p-1 font-semibold text-center rounded">Blocked</div>
      );
  }
};
