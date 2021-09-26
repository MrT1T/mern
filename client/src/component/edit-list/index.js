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
import { useHistory } from 'react-router-dom';
import Image from '../../img/icon.png';

const useStyles = makeStyles({
  cardMedia: {
    paddingTop: '60%'
  }
});

const EditList = ({ labelList, list, onChange, name, buttonText, link }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClickCard = (item) => {
    history.push(link(item));
  };
  const handleClickButton = (event, item) => {
    onChange(name, item);
    event.stopPropagation();
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
            <Card onClick={() => handleClickCard(item)}>
              <CardMedia
                image={Image}
                title="Image"
                className={classes.cardMedia}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {item}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={(event) => {
                    handleClickButton(event, item);
                  }}
                  color="primary"
                >
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
  link: PropTypes.func,
  list: PropTypes.array
};
