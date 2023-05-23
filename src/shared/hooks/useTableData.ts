import { useEffect, useState } from 'react';

interface IUseTableData {
  expandFilter: object;
  fetchList?: any;
  pageSize?: number;
}
export const useTableData = ({ expandFilter = {}, fetchList, pageSize = 10 }: IUseTableData) => {
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [paging, setPaging] = useState({
    currentPage: 1,
    total: 0,
    pageSize: pageSize
  });

  useEffect(() => {
    fetchDataSource();
  }, [expandFilter, paging.currentPage]);

  const fetchDataSource = async () => {
    try {
      if (fetchList) {
        setLoading(true);
        const { data } = await fetchList({
          pageSize: paging.pageSize,
          pageNumber: paging.currentPage,
          ...expandFilter
        });

        setDataSource(data?.items || []);

        setPaging({
          ...paging,
          total: data?.totalCount,
          currentPage: data?.currentPage
        });
      }
    } catch (error) {
      console.error('Exception ' + error);
    } finally {
      setLoading(false);
    }
  };

  const onToogleFilter = () => {
    setShowFilter(!showFilter);
  };

  return {
    dataSource,
    paging,
    loading,
    showFilter,
    setPaging,
    setDataSource,
    fetchDataSource,
    onToogleFilter
  };
};
