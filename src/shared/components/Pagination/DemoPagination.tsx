import React, { useState } from 'react';
import { Pagination } from './Pagination';

export default function DemoPagination() {
  const [paging, setPaging] = useState({ total: 100, page: 1, pageSize: 10 });
  return (
    <div>
      <Pagination
        currentPage={paging.page}
        pageSize={paging.pageSize}
        total={paging.total}
        onChangePage={(page: number) => {
          setPaging({ ...paging, page });
        }}
      />
    </div>
  );
}
