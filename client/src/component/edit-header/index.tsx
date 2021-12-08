import React, { FC } from 'react';
import {
  Breadcrumbs,
  Button,
  Container,
  Link,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import Background from '../../img/night.png';

const useStyles = makeStyles({
  header: {
    backgroundImage: `url(${Background})`,
    height: '20%',
    marginBottom: '2%',
    display: 'flex'
  },
  breadcrumb: {
    paddingTop: '20px',
    fontSize: '48px',
    color: 'var(--white)'
  },
  saveButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    margin: '5% 3%',
    backgroundColor: 'var(--azure-blue)',
    height: '40px',
    color: 'var(--white)'
  }
});

interface EditHeaderPropsType {
  onClick: () => void;
  breadcrumbLabel: string;
  breadcrumbLink: string;
  pageName: string;
}

const EditHeader: FC<EditHeaderPropsType> = ({
  breadcrumbLabel,
  breadcrumbLink,
  pageName,
  onClick
}) => {
  const classes = useStyles();
  return (
    <Paper data-testid="editHeader" className={classes.header}>
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
