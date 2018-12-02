import PropTypes from 'prop-types';
import React from 'react';

import { StyledTopNav } from './TopNav-styled';

const TopNav = ({ children, ...other }) => {
  return <StyledTopNav {...other}>{children}</StyledTopNav>;
};

TopNav.propTypes = {
  /** Description TBD */
  children: PropTypes.node
};

TopNav.defaultProps = {};

TopNav.displayName = 'TopNav';

export default TopNav;
