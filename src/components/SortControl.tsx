import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface SortControlProps {
  field: string;
  direction: string;
  onSortChange: (field: string, direction: string) => void;
  invisible: boolean;
  active: boolean;
}
const SortControl = ({
  field,
  direction,
  onSortChange,
  invisible,
  active,
}: SortControlProps) => {
  const handleSortChange = () => {
    const newDirection = direction === "asc" ? "desc" : "asc";
    onSortChange(field, newDirection);
  };
  return (
    <IconButton
      sx={{
        visibility: invisible && !active ? "hidden" : "visible",
        opacity: active ? 1 : 0.5,
      }}
      onClick={handleSortChange}
    >
      {direction === "asc" ? <ArrowDownward /> : <ArrowUpward />}
    </IconButton>
  );
};

export default SortControl;
