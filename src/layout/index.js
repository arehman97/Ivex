import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
  useTheme,
} from '@mui/material';
import Metadata from '../views/metadata';

const Layout = () => {
  const theme = useTheme();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6">Automated Driving Metadata</Typography>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        sx={{
          marginTop: 5,
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Toolbar />
        <Metadata />
      </Container>
    </div>
  );
};

export default Layout;