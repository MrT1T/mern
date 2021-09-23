import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  cardMedia: {
    paddingTop: '60%'
  }
});

const EditList = ({ labelList, list, onChange, name, buttonText }) => {
  const classes = useStyles();
  const handleClick = (item) => {
    onChange(name, item);
  };
  return (
    <Container>
      <Box>
        <Typography
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {labelList}
        </Typography>
      </Box>
      <Grid justifyContent="center" container spacing={4}>
        {list?.map((item) => (
          <Grid item key={item}>
            <Card>
              <CardMedia
                image="https://source.unsplash.com/random"
                title="Image"
                className={classes.cardMedia}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {item}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleClick(item)} color="primary">
                  {buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EditList;

EditList.propTypes = {
  labelList: PropTypes.string,
  buttonText: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  list: PropTypes.array
};
