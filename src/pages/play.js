import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'node-fetch';

const useStyles = makeStyles(theme => ({
  answerCorrect: {
    width: '80px',
    height: '80px',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
    '& svg': {
      fontSize: '56px',
    },
  },

  answerIncorrect: {
    width: '80px',
    height: '80px',
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
    '& svg': {
      fontSize: '56px',
    },
  },
}));

const Play = ({ words }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" disableGutters>
      {words}
      <Box mt={4} mb={4} px={4}>
        <Card>
          <Box py={8}>
            <Typography variant="h4" align="center">
              お題 CARD
            </Typography>
          </Box>
        </Card>
      </Box>

      <Box mb={4} px={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          style={{ borderRadius: 50 }}
        >
          <Typography variant="h5">次のお題</Typography>
        </Button>
      </Box>

      <Grid container justify="space-around">
        <Grid item>
          <Fab className={classes.answerCorrect}>
            <CheckIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Fab className={classes.answerIncorrect}>
            <CloseIcon />
          </Fab>
        </Grid>
      </Grid>
    </Container>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    'https://script.google.com/macros/s/AKfycbws3-V2qvM3RY3rLlmtw_D0cmeYHWbf8xUJx_cnQ885x_Cs3cU/exec'
  );
  const data = await res.json();
  let words = [];

  for (let key in data) {
    words = [...words, ...data[key]];
  }

  return {
    props: {
      words,
    },
  };
}

export default Play;
