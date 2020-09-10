
import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter, TablePagination, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/index';
import { Redirect } from 'react-router-dom';
import history from '../history';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

function MovieList(props) {
  const classes = useStyles();
  const [searchTag, setSearchTag] = React.useState('pokemon');
  const [id, setId] = useState(null)
  const [page, setPage] = React.useState(0);
  const [mPage, setmPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = useState(false);

  const { search, total } = useSelector(state => state.movieReducer);
  const movieDispatch = useDispatch();

  async function handleChangePage(event, newPage) {
    setPage(newPage);

    newPage > page ? setmPage(1) : setmPage(0);

    if (newPage === Math.floor(total / 5)) {
      setLoading(true);
      await movieDispatch(actions.fetchMovies(searchTag, Math.round(total / 10)))
      setmPage(1)
      setLoading(false);
    }
    else if (newPage !== 0 && newPage % 2 === 0 && newPage > page && newPage - page === 1) {
      setLoading(true);
      await movieDispatch(actions.fetchMovies(searchTag, (newPage / 2) + 1))
      setmPage(0)
      setLoading(false);
    }
    else if (newPage !== 0 && newPage % 2 !== 0 && newPage < page && page - newPage === 1) {
      setLoading(true);
      await movieDispatch(actions.fetchMovies(searchTag, Math.ceil(newPage / 2)))
      setmPage(1)
      setLoading(false);
    }
    else if (newPage === 0) {
      await movieDispatch(actions.fetchMovies(searchTag, 1))
      setmPage(0)
    }
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  useEffect(() => {
    setLoading(true);
    movieDispatch(actions.fetchMovies(searchTag, 1));
    setLoading(false);
  }, [searchTag, movieDispatch]);


  const handleChange = (e) => {
    setSearchTag(e.target.value)
    movieDispatch(actions.fetchMovies(e.target.value, 1))
    e.target.value === '' && movieDispatch(actions.fetchMovies(undefined, 1))
  }

  const handleDetail = (title, id) => {
    setId(id);
    movieDispatch({ type: "TITLE", payload: { title: title } });
    history.push(`/movie/${id}`);
  }

  if (id !== null) {
    return <Redirect to={`/movie/${id}`} />
  }

  return (
    <>
      <TextField
        id="outlined-name"
        label="Search"
        className={classes.textField}
        value={searchTag}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="center">Year</StyledTableCell>
              <StyledTableCell align="center">IMDB ID</StyledTableCell>
            </TableRow>
          </TableHead>
          {loading === false ? <TableBody>
            {search && search
              .sort((a, b) => { return parseInt((b.Year).split('-')[0]) - parseInt((a.Year).split('-')[0]) })
              .slice(mPage * rowsPerPage, mPage * rowsPerPage + 5)
              .map((data, index) => (
                <StyledTableRow key={index} hover style={{ cursor: 'pointer' }}>
                  <StyledTableCell onClick={() => handleDetail(data.Title, data.imdbID)} component="th" scope="row">{data.Title}</StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">{data.Year}</StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">{data.imdbID}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody> : <TableBody><TableRow><TableCell><span>Loading...</span></TableCell></TableRow></TableBody>}
          <TableFooter>
            <TableRow>
              {total && <TablePagination
                rowsPerPageOptions={[5]}
                colSpan={3}
                count={parseInt(total)}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'Rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />}
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </>
  );
}

export default MovieList;