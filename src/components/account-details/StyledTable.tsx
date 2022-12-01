import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const readableDate = (date: any): React.Key => {
  return `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`;
}

export default function CustomizedTables(props: any) {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Date</StyledTableCell>
            <StyledTableCell align='center'>Description</StyledTableCell>
            <StyledTableCell align='center'>Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transaction.map((trans: any) => (
            <StyledTableRow key={uuidv4()}>
              <StyledTableCell align='center' style={{color: trans.type !== 'Expense' ? 'mediumseagreen' : 'crimson'}}>{readableDate(trans.creationDate)}</StyledTableCell>
              <StyledTableCell align='center' style={{color: trans.type !== 'Expense' ? 'mediumseagreen' : 'crimson'}}>{trans.description}</StyledTableCell>
              <StyledTableCell align='center' style={{color: trans.type !== 'Expense' ? 'mediumseagreen' : 'crimson'}}><span>{trans.type==='Expense' ? '-' : null}</span>${trans.amount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}