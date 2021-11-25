import React from 'react';
import {
  TableContainer,
  Table,
  TablePagination,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  Typography,
} from '@mui/material';
import { Avatar, Checkbox, Paper } from '@mui/material';
import {
  deepOrange,
  deepPurple,
  teal,
  green,
  yellow,
  amber,
  cyan,
  indigo,
} from '@mui/material/colors';

import TablePaginationActions from './Table.pagination';

export default function TodoTable(props) {
  const {
    list,
    page,
    pageSize,
    handleCheckboxChange,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  const colors = [
    deepOrange[500],
    deepPurple[500],
    teal[500],
    green[500],
    yellow[500],
    amber[500],
    cyan[500],
    indigo[500],
  ];
  const getRandomColor = (initials) => {
    const initialsVal = parseInt(initials.toUpperCase(), 36) - 10;
    const rand = Math.floor(initialsVal % colors.length);
    const color = colors[rand];
    return { bgcolor: color };
  };

  return (
    <TableContainer component={Paper}>
      <Table variant="simple" size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Tarea</TableCell>
            <TableCell>Completado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list
            .slice(page * pageSize, page * pageSize + pageSize)
            .map((listItem, indexItem) => (
              <TableRow hover={true} selected={listItem.completed}>
                <TableCell>
                  <Avatar sx={getRandomColor(listItem.userName)}>
                    {listItem.userName}
                  </Avatar>
                </TableCell>

                <TableCell>
                  <Typography
                    as={listItem.completed ? 'del' : ''}
                    color={listItem.completed ? 'gray' : 'black'}
                  >
                    {listItem.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Checkbox
                    onChange={() => handleCheckboxChange(indexItem)}
                    checked={listItem.completed}
                    color="success"
                    size="large"
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={list.length}
              rowsPerPage={pageSize}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
