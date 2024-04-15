import {} from "os";
import { useState } from "react";

type Tprops = {
  page?: number;
  pageSize?: number;
  disabled?: boolean;
};

export default function usePagination(props?: Tprops) {
  const [page, setPage] = useState(props?.page || 1);

  const [pageSize, setPageSize] = useState(props?.pageSize || 5);

  const onChange = (page: number, pageSize: number) => {
    if (page > 0) {
      setPage(page);
    }
    setPageSize(pageSize);
  };

  return {
    current: page,
    pageSize,
    onChange,
    disabled: props?.disabled || false,
  };
}
