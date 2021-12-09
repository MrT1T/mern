import React, { FC, MouseEvent, useCallback } from 'react';
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
import { useHistory } from 'react-router-dom';
import Image from '../../img/icon.png';
import { linksHelper } from '../../helpers/links.helper';
import type { Item } from '../../types/store.type';
import type { OnChangeHandlerType } from '../../types/func.type';

const useStyles = makeStyles({
  card: {
    width: '20%'
  },
  cardMedia: {
    paddingTop: '60%'
  }
});

interface EditListPropsType {
  labelList: string;
  buttonText: string;
  name: string;
  onChange: OnChangeHandlerType;
  link: string;
  list: Array<Item>;
}

const EditList: FC<EditListPropsType> = ({
  labelList,
  list,
  onChange,
  name,
  buttonText,
  link
}) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClickCard = (item: string) => {
    history.push(linksHelper(link, item));
  };
  const handleClickButton = useCallback(
    (event: MouseEvent, item: string) => {
      onChange(name, item);
      event.stopPropagation();
    },
    [onChange]
  );
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
        {/* eslint-disable-next-line no-shadow */}
        {list?.map(({ name, value }) => (
          <Grid data-testid="card" item key={name} className={classes.card}>
            <Card onClick={() => handleClickCard(name)}>
              <CardMedia
                image={Image}
                title="Image"
                className={classes.cardMedia}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={(event) => {
                    handleClickButton(event, value);
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
