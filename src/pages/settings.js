import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SettingsOption from '../components/SettingsOption';

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
    <>
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
      <TabPanel tabIndexCurrent={tabIndexCurrent} tabIndex={0}>
        <SettingsOption />
      </TabPanel>
      <TabPanel tabIndexCurrent={tabIndexCurrent} tabIndex={1}>
        プレイヤー
      </TabPanel>
    </>
  );
};

export default Settings;
