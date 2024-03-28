import { TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import BaseTable from "./BaseTable";

interface Tag {
  name: string;
  count: number;
}
const API_URL = "https://api.stackexchange.com/2.3/tags";
const DocsTable = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const [hoverHeaderCell, setHoverHeaderCell] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_URL}?page=${page}&pagesize=${rowsPerPage}&order=${sortOrder}&sort=${sortBy}&site=stackoverflow`
        );
        const data = await response.json();
        setTags(data.items);
      } catch (error) {
        setError("Error fetching data");
      }
      setLoading(false);
    };
    fetchData();
  }, [page, rowsPerPage, sortBy, sortOrder]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };
  const handleSortChange = (field: string, direction: string) => {
    setSortBy(field);
    setSortOrder(direction);
  };

  return (
    <BaseTable<Tag>
      loading={loading}
      error={error}
      rows={tags}
      tableHeadItems={[
        { field: "name", label: "Name", width: "50%" },
        { field: "popular", label: "Count", width: "50%" },
      ]}
      page={page}
      handleChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      sortOrder={sortOrder}
      sortBy={sortBy}
      setHoverHeaderCell={setHoverHeaderCell}
      hoverHeaderCell={hoverHeaderCell}
      handleSortChange={handleSortChange}
      renderRow={(row) => (
        <>
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.count}</TableCell>
          </TableRow>
        </>
      )}
    />
  );
};

export default DocsTable;
