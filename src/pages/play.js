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
import { yellow, lightGreen } from '@material-ui/core/colors';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
  answer: {
    width: '80px',
    height: '80px',
    '& svg': {
      fontSize: '56px',
    },
  },

  correct: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
  },

  incorrect: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
  },
}));

const WordCard = ({ word }) => {
  const useStyles = makeStyles({
    card: {
      backgroundColor:
        word.type === 'normal'
          ? ''
          : word.type === 'gesture'
          ? lightGreen[200]
          : yellow[200],
    },
  });

  const classes = useStyles();

  const [wordTypeText] = useState({
    normal: '',
    gesture: 'ジェスチャー',
    katakoto: 'カタコト',
  });

  return (
    <Card className={classes.card}>
      <Box position="relative" py={8}>
        <Typography variant="h5" align="center">
          {word.string}
        </Typography>
        <Box position="absolute" top={0} right={0} p={1}>
          {wordTypeText[word.type]}
        </Box>
      </Box>
    </Card>
  );
};

WordCard.propTypes = {
  word: PropTypes.object.isRequired,
};

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
  const [word, setWord] = useState({ string: 'お題 CARD', type: 'normal' });
  const [slideTransition, setSlideTransition] = useState({
    show: true,
    direction: 'left',
  });
  const [sound, setSound] = useState();
  const [typeRatioSum] = useState(
    parseInt(
      settings.typeRatio.normal +
        settings.typeRatio.gesture +
        settings.typeRatio.katakoto
    )
  );
  const [isGameover, setIsGameover] = useState(false);

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
    setSlideTransition({ show: false, direction: 'right' });
  };

  const getNextWord = () => {
    if (wordsRemaining.length <= 0) {
      setWord({ string: 'GAME OVER', type: 'normal' });
      setIsGameover(true);
      return;
    }

    const word = { string: getWordRand(), type: getWordTypeRand() };
    setWord(word);
  };

  const getWordTypeRand = () => {
    const rnd = Math.floor(Math.random() * typeRatioSum) + 1;

    if (rnd <= settings.typeRatio.normal) {
      return 'normal';
    } else if (
      rnd > settings.typeRatio.normal &&
      rnd <= settings.typeRatio.normal + settings.typeRatio.gesture
    ) {
      return 'gesture';
    } else {
      return 'katakoto';
    }
  };

  const onExitedSlideTransition = () => {
    getNextWord();
    setSlideTransition({ show: true, direction: 'left' });
  };

  return (
    <Box overflow="hidden" mt={-2}>
      <Container maxWidth="sm" disableGutters>
        <Box mt={4} mb={4} px={4}>
          <Slide
            direction={slideTransition.direction}
            in={slideTransition.show}
            appear={false}
            timeout={150}
            onExited={onExitedSlideTransition}
          >
            <div>
              <WordCard word={word} />
            </div>
          </Slide>
        </Box>

        <Box mb={4} px={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={isGameover}
            style={{ borderRadius: 50 }}
            onClick={drawNextWord}
          >
            <Typography variant="h5">次のお題</Typography>
          </Button>
        </Box>

        <Box mb={4}>
          <Grid container justify="space-around">
            <Grid item>
              <Fab
                disabled={isGameover}
                className={`${classes.answer} ${classes.correct}`}
                onClick={() => answer('correct')}
              >
                <CheckIcon />
              </Fab>
            </Grid>
            <Grid item>
              <Fab
                disabled={isGameover}
                className={`${classes.answer} ${classes.incorrect}`}
                onClick={() => answer('incorrect')}
              >
                <CloseIcon />
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
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
