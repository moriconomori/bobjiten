import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { connect } from 'react-redux';

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

const Play = ({ wordsAll, settings }) => {
  const getWordRand = () => {
    const length = wordsRemaining.length;
    const index = Math.floor(Math.random() * length);
    const word = wordsRemaining[index];
    setWordsRemaining(
      wordsRemaining.filter(word => word !== wordsRemaining[index])
    );
    return word;
  };

  const initWords = () => {
    let words = [];
    for (let version in settings.included) {
      if (settings.included[version]) {
        words = [...words, ...wordsAll[version]];
      }
    }
    return words;
  };

  const [wordsRemaining, setWordsRemaining] = useState(initWords);
  const [word, setWord] = useState('お題 CARD');
  const [sound, setSound] = useState();

  useEffect(() => {
    const draw = new Audio('/sound/draw.mp3');
    const correct = new Audio('/sound/correct.mp3');
    const incorrect = new Audio('/sound/incorrect.mp3');

    setSound({
      draw,
      correct,
      incorrect,
    });
  }, []);

  const playSound = type => {
    if (!settings.sound) {
      return;
    }

    sound[type].currentTime = 0;
    sound[type].play();
  };

  const answer = type => {
    playSound(type);
  };

  const classes = useStyles();

  const drawNextWord = () => {
    playSound('draw');

    if (wordsRemaining.length <= 0) {
      setWord('GAME OVER');
      return;
    }

    const word = getWordRand();
    setWord(word);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Box mt={4} mb={4} px={4}>
        <Card>
          <Box py={8}>
            <Typography variant="h5" align="center">
              {word}
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
          onClick={drawNextWord}
        >
          <Typography variant="h5">次のお題</Typography>
        </Button>
      </Box>

      <Grid container justify="space-around">
        <Grid item>
          <Fab
            className={classes.answerCorrect}
            onClick={() => answer('correct')}
          >
            <CheckIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            className={classes.answerIncorrect}
            onClick={() => answer('incorrect')}
          >
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
  const wordsAll = await res.json();

  return {
    props: {
      wordsAll,
    },
  };
}

Play.propTypes = {
  wordsAll: PropTypes.object,
  settings: PropTypes.object,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps, null)(Play);
