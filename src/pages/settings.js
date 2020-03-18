import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

export default function Settings() {
  return (
    <Container maxWidth="sm" disableGutters>
      <Container>
        <Box my={2}>
          <Typography variant="subtitle1">設定</Typography>
        </Box>
      </Container>
      <Divider />
      <Container>
        <IncludedList />
      </Container>
      <Divider />
      <Container>
        <TypeRatio />
      </Container>
      <Divider />
      <Container>
        <Sound />
      </Container>
      <Divider />
    </Container>
  );
}

function IncludedList() {
  const [checked, setChecked] = React.useState([0, 1, 2]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <React.Fragment>
      <List>
        <ListSubheader disableGutters>含めるカタカナ語</ListSubheader>
        <ListItem button onClick={handleToggle(0)} disableGutters>
          <ListItemText id="1">オリジナル</ListItemText>
          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              onChange={handleToggle(0)}
              checked={checked.indexOf(0) !== -1}
              disableRipple
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button onClick={handleToggle(1)} disableGutters>
          <ListItemText id="2">その 1</ListItemText>
          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              onChange={handleToggle(1)}
              checked={checked.indexOf(1) !== -1}
              disableRipple
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button onClick={handleToggle(2)} disableGutters>
          <ListItemText id="3">その 2</ListItemText>
          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              onChange={handleToggle(2)}
              checked={checked.indexOf(2) !== -1}
              disableRipple
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

const typeRatioStyles = makeStyles({
  typeLabel: {
    minWidth: '6em',
    paddingBottom: '4px',
  },

  input: {
    maxWidth: '2em',
    marginBottom: '4px',
    '& > input': {
      textAlign: 'right',
    },
  },
});

function TypeRatio() {
  const style = typeRatioStyles();

  const [value, setValue] = React.useState({
    normal: 80,
    gesture: 10,
    katakoto: 10,
  });

  const handleSliderChange = type => (event, newValue) => {
    setValue({ ...value, [type]: newValue });
  };

  const handleInputChange = event => {
    const type = event.target.name;
    const newValue =
      event.target.value === '' ? '' : Number(event.target.value);

    setValue({ ...value, [type]: newValue });
  };

  const handleBlur = type => {
    if (value[type] < 0) {
      setValue({ ...value, [type]: 0 });
    } else if (value[type] > 100) {
      setValue({ ...value, [type]: 100 });
    }
  };

  return (
    <React.Fragment>
      <List>
        <ListSubheader disableGutters>出現比率</ListSubheader>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Box className={style.typeLabel}>普通</Box>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value.normal === 'number' ? value.normal : 0}
              onChange={handleSliderChange('normal')}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              name="normal"
              value={value.normal}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur('normal')}
              inputProps={{
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              className={style.input}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Box className={style.typeLabel}>ジェスチャー</Box>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value.gesture === 'number' ? value.gesture : 0}
              onChange={handleSliderChange('gesture')}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              name="gesture"
              value={value.gesture}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur('gesture')}
              inputProps={{
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              className={style.input}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Box className={style.typeLabel}>カタコト</Box>
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value.katakoto === 'number' ? value.katakoto : 0}
              onChange={handleSliderChange('katakoto')}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              name="katakoto"
              value={value.katakoto}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur('katakoto')}
              inputProps={{
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              className={style.input}
            />
          </Grid>
        </Grid>
      </List>
    </React.Fragment>
  );
}

function Sound() {
  const [enabled, setEnabled] = React.useState(true);

  const handleChange = event => {
    setEnabled(event.target.checked);
  };

  return (
    <React.Fragment>
      <List>
        <ListSubheader disableGutters>サウンド</ListSubheader>
        <ListItem disableGutters>
          <ListItemText>効果音を出す</ListItemText>
          <ListItemSecondaryAction>
            <Switch
              checked={enabled}
              edge="end"
              onChange={handleChange}
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
