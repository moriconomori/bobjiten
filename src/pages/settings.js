import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import BackIcon from '@material-ui/icons/ArrowBack';
import SettingsOption from '../components/SettingsOption';
import SettingsPlayer from '../components/SettingsPlayer';

function TabPanel(props) {
  const { children, tabIndexCurrent, tabIndex, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={tabIndexCurrent !== tabIndex}
      id={`tabpanel-${tabIndex}`}
      aria-labelledby={`tab-${tabIndex}`}
      {...other}
    >
      {tabIndexCurrent === tabIndex && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  tabIndex: PropTypes.any.isRequired,
  tabIndexCurrent: PropTypes.any.isRequired,
};

function a11yProps(tabIndex) {
  return {
    id: `tab-${tabIndex}`,
    'aria-controls': `tabpanel-${tabIndex}`,
  };
}

const Settings = () => {
  const [tabIndexCurrent, setTabIndexCurrent] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndexCurrent(newValue);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Tabs
        value={tabIndexCurrent}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="Tabs"
      >
        <Tab label="オプション" {...a11yProps(0)} />
        <Tab label="プレイヤー" {...a11yProps(1)} />
      </Tabs>
      <Divider />

      <TabPanel tabIndexCurrent={tabIndexCurrent} tabIndex={0}>
        <SettingsOption />
      </TabPanel>
      <TabPanel tabIndexCurrent={tabIndexCurrent} tabIndex={1}>
        <SettingsPlayer />
      </TabPanel>

      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <Box width="50%">
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
      </Box>
    </Container>
  );
};

export default Settings;
