import {
  Breadcrumbs,
  Button,
  Container,
  Link,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  header: {
    backgroundImage:
      'url(https://bipbap.ru/wp-content/uploads/2017/07/2ec44ae0527285899bda6e361d96aa88-700.jpg)',
    height: '20%',
    marginBottom: '2%',
    display: 'flex'
  },
  breadcrumb: {
    paddingTop: '20px',
    fontSize: '48px',
    color: '#fff'
  },
  saveButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    margin: '5% 3%',
    backgroundColor: '#3f51b5',
    height: '40px',
    color: '#fff'
  }
});

const EditHeader = ({ breadcrumbLabel, breadcrumbLink, pageName, onClick }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.header}>
      <Container>
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
          <Link underline="hover" color="inherit" href={breadcrumbLink}>
            {breadcrumbLabel}
          </Link>
          <Typography variant="h3">{pageName}</Typography>
        </Breadcrumbs>
      </Container>
      <Container className={classes.saveButtonContainer}>
        <Button
          onClick={onClick}
          className={classes.button}
          variant="contained"
        >
          Save Edit Information
        </Button>
      </Container>
    </Paper>
  );
};

export default EditHeader;

EditHeader.propTypes = {
  onClick: PropTypes.func,
  breadcrumbLabel: PropTypes.string,
  breadcrumbLink: PropTypes.string,
  pageName: PropTypes.string
};
