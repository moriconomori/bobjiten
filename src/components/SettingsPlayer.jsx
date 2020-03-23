import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playersAction } from '../store/players/action';

const PlayerList = ({ players }) => {
  const isEmpty = players => {
    return !players.length;
  };

  if (isEmpty(players)) {
    return (
      <Box my={4}>
        <Typography variant="h5" align="center">
          No Players
        </Typography>
      </Box>
    );
  }

  return (
    <Box my={2}>
      <List>
        {players.map(player => (
          <ListItem key={player.name}>
            <Typography variant="h5" align="center">
              {player.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

PlayerList.propTypes = {
  players: PropTypes.array,
};

const SettingsPlayer = ({ players, addPlayer }) => {
  const [name, setName] = useState('');

  const handleAddPlayer = () => {
    if (name !== '') {
      addPlayer({ name });
      setName('');
    }
  };

  const handleOnChange = event => {
    const name = event.target.value;
    setName(name);
  };

  return (
    <Container maxWidth="sm">
      <PlayerList players={players} />

      <Box mb={4} display="flex">
        <Box mr={1} flexGrow={1}>
          <form autoComplete="off">
            <TextField
              id="name"
              variant="outlined"
              fullWidth
              placeholder="名前"
              value={name}
              onChange={handleOnChange}
            />
          </form>
        </Box>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleAddPlayer}
        >
          追加
        </Button>
      </Box>
    </Container>
  );
};

SettingsPlayer.propTypes = {
  players: PropTypes.array,
  addPlayer: PropTypes.func,
};

const mapStateToProps = state => ({
  players: state.players,
});

const mapDispatchToProps = dispatch => {
  return {
    addPlayer: bindActionCreators(playersAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPlayer);
