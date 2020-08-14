
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
import { connect } from 'react-redux';
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
  let [initial, setInitial] = useState(1);
  const [page, setPage] = React.useState(0);
  const [mPage, setmPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  async function handleChangePage(event, newPage) {
    setPage(newPage);
    setmPage(1);
    if(newPage === 39){
      await props.onFetchMovies(searchTag,20);
      setmPage(1)
    }
    else if (newPage !== 0 && newPage % 2 === 0 && newPage > page && newPage - page === 1) {
      await props.onFetchMovies(searchTag, ++initial)
      setInitial(initial)
      setmPage(0)
    }
    else if (newPage === 0) {
      setInitial(1)
      await props.onFetchMovies(searchTag, 1)
      setmPage(0)
    }
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  useEffect(() => {
    props.onFetchMovies(searchTag, 1);
  }, []);


  const handleChange = (e) => {
    setSearchTag(e.target.value)
    props.onFetchMovies(e.target.value, 1)
    e.target.value === '' && props.onFetchMovies(undefined, 1)
  }

  const handleDetail = (title, id) => {
    setId(id);
    props.onSendTitle(title);
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
          <TableBody>
            {props.search && props.search
              .sort((a, b) => { return parseInt((b.Year).split('-')[0]) - parseInt((a.Year).split('-')[0]) })
              .slice(mPage * rowsPerPage, mPage * rowsPerPage + 5)
              .map((data, index) => (
                <StyledTableRow key={index} hover style={{ cursor: 'pointer' }}>
                  <StyledTableCell onClick={() => handleDetail(data.Title, data.imdbID)} component="th" scope="row">{data.Title}</StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">{data.Year}</StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">{data.imdbID}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {props.total && <TablePagination
                rowsPerPageOptions={[5]}
                colSpan={3}
                count={parseInt(props.total)}
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

const mapStateToProps = state => {
  return {
    search: state.movieReducer.search,
    total: state.movieReducer.total
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMovies: (search, page) => dispatch(actions.fetchMovies(search, page)),
    onSendTitle: (title) => dispatch({ type: "TITLE", payload: { title: title } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);