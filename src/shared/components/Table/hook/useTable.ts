import _ from 'lodash';
import { useState } from 'react';

export const useTable = ({ rowSelection, lastDataTable, setLastDataTable }: any) => {
  const [masterSelected, setMasterSelected] = useState<boolean>(false);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  const onItemCheck = (item: Record<string, string>) => {
    if (item.checked) {
      const afterSelected = _.remove(selectedRows, function (n) {
        return n === item.key;
      });
      handleAfterSelect(item.key, afterSelected, false);
    } else {
      setIndeterminate(true);
      handleAfterSelect(item.key, [...selectedRows, item.key], true);
    }
  };

  const handleAfterSelect = (
    key: string,
    afterSelected: Array<string | number>,
    checkedRow: boolean
  ) => {
    const foundIndex = _.findIndex(lastDataTable, function (o: any) {
      return o.key === key;
    });
    if (foundIndex) {
      const newData = { ...lastDataTable };
      newData[foundIndex] = { ...newData[foundIndex], checked: checkedRow };
      setLastDataTable(newData);
    }

    setSelectedRows(afterSelected);
    rowSelection.onChangeSelected(key, afterSelected);
  };

  const onMasterCheck = () => {
    setIndeterminate(false);
    setMasterSelected(!masterSelected);
  };

  return { masterSelected, selectedRows, indeterminate, onItemCheck, onMasterCheck };
};
