import {
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import SortControl from "./SortControl";

type TableHeadItem = {
  field: string;
  label: string;
  width?: number | string;
};

export type BaseTableProps<T> = {
  loading: boolean;
  error: string | null;
  rows: T[];
  tableHeadItems: TableHeadItem[];
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  rowsPerPage: number;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortOrder: string;
  sortBy: string;
  setHoverHeaderCell: (hoverHeaderCell: string | null) => void;
  hoverHeaderCell: string | null;
  handleSortChange: (field: string, direction: string) => void;
  renderRow: (row: T) => JSX.Element;
};
function BaseTable<T>({
  loading,
  error,
  rows,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  sortOrder,
  sortBy,
  setHoverHeaderCell,
  hoverHeaderCell,
  handleSortChange,
  renderRow,
  tableHeadItems,
}: BaseTableProps<T>) {
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <TablePagination
            count={-1}
            slotProps={{
              actions: { previousButton: { disabled: page === 1 } },
            }}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeadItems.map((item) => (
                    <TableCell
                      width={item.width}
                      key={item.field}
                      onMouseEnter={() => setHoverHeaderCell(item.field)}
                      onMouseLeave={() => setHoverHeaderCell(null)}
                    >
                      {item.label}
                      <SortControl
                        field={item.field}
                        direction={sortOrder}
                        onSortChange={handleSortChange}
                        invisible={hoverHeaderCell !== item.field}
                        active={sortBy === item.field}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{rows.map(renderRow)}</TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}

export default BaseTable;
