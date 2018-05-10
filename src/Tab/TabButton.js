import PropTypes from 'prop-types';
import React from 'react';
import { StyledTabSection, StyledTabTitle } from './Tab-styled';

const TabButton = ({ children, ...props }) => {
  const setActiveTab = e => {
    props.setActiveTab(e, props.index);
  };
  const tabButton = (
    <StyledTabSection onClick={setActiveTab}>
      <StyledTabTitle active={props.activeTab === props.index}>
        {children}
      </StyledTabTitle>
    </StyledTabSection>
  );

  return tabButton;
};

TabButton.propTypes = {
  title: PropTypes.string
};

TabButton.defaultProps = {
  title: ''
};

export default TabButton;
