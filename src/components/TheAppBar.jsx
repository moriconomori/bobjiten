import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

export default function TheAppBar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky">
        <Container maxWidth="sm" disableGutters>
          <Toolbar>カタヌキ</Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}
