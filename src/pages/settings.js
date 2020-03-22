import React from 'react';
import PropTypes from 'prop-types';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { settingsAction } from '../store/settings/action';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import BackIcon from '@material-ui/icons/ArrowBack';

const Settings = ({ settings, setSettings }) => {
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

  const typeRatioClasses = typeRatioStyles();

  const handleIncluded = version => () => {
    const newValue = { [version]: !settings.included[version] };
    const newIncluded = { included: { ...settings.included, ...newValue } };
    const newSettings = Object.assign(settings, newIncluded);
    setSettings(newSettings);
  };

  const handleSound = () => {
    const newSettings = Object.assign(settings, { sound: !settings.sound });
    setSettings(newSettings);
  };

  const handleTypeRatioSlider = type => (event, newValue) => {
    const newTypeRatio = Object.assign(settings.typeRatio, {
      [type]: newValue,
    });
    const newSettings = Object.assign(settings, { typeRatio: newTypeRatio });
    setSettings(newSettings);
  };

  const handleTypeRatioInput = event => {
    const type = event.target.name;
    let newValue = event.target.value === '' ? '' : Number(event.target.value);

    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 100) {
      newValue = 100;
    }

    const newTypeRatio = Object.assign(settings.typeRatio, {
      [type]: newValue,
    });
    const newSettings = Object.assign(settings, { typeRatio: newTypeRatio });
    setSettings(newSettings);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Container>
        <Box my={2}>
          <Typography variant="subtitle1">設定</Typography>
        </Box>
      </Container>

      <Divider />

      <Container disableGutters>
        <List>
          <ListSubheader>含めるカタカナ語</ListSubheader>
          <ListItem button onClick={handleIncluded('v0')}>
            <ListItemText id="1">オリジナル</ListItemText>
            <ListItemSecondaryAction>
              <Checkbox
                onChange={handleIncluded('v0')}
                checked={settings.included.v0}
                disableRipple
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button onClick={handleIncluded('v1')}>
            <ListItemText id="2">その 1</ListItemText>
            <ListItemSecondaryAction>
              <Checkbox
                onChange={handleIncluded('v1')}
                checked={settings.included.v1}
                disableRipple
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button onClick={handleIncluded('v2')}>
            <ListItemText id="3">その 2</ListItemText>
            <ListItemSecondaryAction>
              <Checkbox
                onChange={handleIncluded('v2')}
                checked={settings.included.v2}
                disableRipple
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Container>

      <Divider />

      <Container disableGutters>
        <Box px={2}>
          <Box pr={1}>
            <List>
              <ListSubheader disableGutters>出現比率</ListSubheader>

              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box className={typeRatioClasses.typeLabel}>普通</Box>
                </Grid>
                <Grid item xs>
                  <Slider
                    value={
                      typeof settings.typeRatio.normal === 'number'
                        ? settings.typeRatio.normal
                        : 0
                    }
                    onChange={handleTypeRatioSlider('normal')}
                    aria-labelledby="input-slider"
                  />
                </Grid>
                <Grid item>
                  <Input
                    name="normal"
                    value={settings.typeRatio.normal}
                    onChange={handleTypeRatioInput}
                    inputProps={{
                      min: 0,
                      max: 100,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                    }}
                    className={typeRatioClasses.input}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box className={typeRatioClasses.typeLabel}>ジェスチャー</Box>
                </Grid>
                <Grid item xs>
                  <Slider
                    value={
                      typeof settings.typeRatio.gesture === 'number'
                        ? settings.typeRatio.gesture
                        : 0
                    }
                    onChange={handleTypeRatioSlider('gesture')}
                    aria-labelledby="input-slider"
                  />
                </Grid>
                <Grid item>
                  <Input
                    name="gesture"
                    value={settings.typeRatio.gesture}
                    onChange={handleTypeRatioInput}
                    inputProps={{
                      min: 0,
                      max: 100,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                    }}
                    className={typeRatioClasses.input}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box className={typeRatioClasses.typeLabel}>カタコト</Box>
                </Grid>
                <Grid item xs>
                  <Slider
                    value={
                      typeof settings.typeRatio.katakoto === 'number'
                        ? settings.typeRatio.katakoto
                        : 0
                    }
                    onChange={handleTypeRatioSlider('katakoto')}
                    aria-labelledby="input-slider"
                  />
                </Grid>
                <Grid item>
                  <Input
                    name="katakoto"
                    value={settings.typeRatio.katakoto}
                    onChange={handleTypeRatioInput}
                    inputProps={{
                      min: 0,
                      max: 100,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                    }}
                    className={typeRatioClasses.input}
                  />
                </Grid>
              </Grid>
            </List>
          </Box>
        </Box>
      </Container>

      <Divider />

      <Container disableGutters>
        <List>
          <ListSubheader>サウンド</ListSubheader>
          <ListItem button onClick={handleSound}>
            <ListItemText>効果音を出す</ListItemText>
            <ListItemSecondaryAction>
              <Switch
                checked={settings.sound}
                onChange={handleSound}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Container>

      <Divider />

      <Box my={4} px={2}>
        <Link href="/">
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<BackIcon />}
            style={{ borderRadius: 50 }}
          >
            戻る
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

Settings.propTypes = {
  settings: PropTypes.object,
  setSettings: PropTypes.func,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => {
  return {
    setSettings: bindActionCreators(settingsAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
