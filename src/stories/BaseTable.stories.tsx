import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import BaseTable, { BaseTableProps } from "../components/BaseTable";
import { TableRow, TableCell } from "@mui/material";

export default {
  title: "Components/BaseTable",
  component: BaseTable,
} as Meta;

const Template: StoryFn<BaseTableProps<any>> = (args) => (
  <BaseTable {...args} />
);

export const BaseTableStory = Template.bind({});
BaseTableStory.args = {
  loading: false,
  error: "",
  rows: [
    { name: "A", count: 10 },
    { name: "Z", count: 20 },
    { name: "B", count: 30 },
    { name: "V", count: 40 },
    { name: "N", count: 50 },
    { name: "A", count: 10 },
    { name: "Z", count: 20 },
    { name: "B", count: 30 },
    { name: "V", count: 40 },
    { name: "N", count: 50 },
    { name: "A", count: 10 },
  ],
  tableHeadItems: [
    { field: "name", label: "Name" },
    { field: "count", label: "Count" },
  ],
  page: 1,
  handleChangePage: () => {},
  rowsPerPage: 10,
  handleChangeRowsPerPage: () => {},
  sortOrder: "asc",
  sortBy: "name",
  setHoverHeaderCell: () => {},
  hoverHeaderCell: null,
  handleSortChange: () => {},
  renderRow: (row) => (
    <TableRow key={row.name}>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.count}</TableCell>
    </TableRow>
  ),
};
