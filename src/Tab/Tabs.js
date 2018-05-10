import PropTypes from 'prop-types';
import React from 'react';
import { StyledTab, StyledTabNav } from './Tab-styled';
import TabButton from './TabButton';
import TabSection from './TabSection';

const Tabs = ({ children, ...props }) => {
  const childArray = React.Children.toArray(children);
  const tabButtonarray = childArray.filter(child => {
    return child.type.name === 'TabButton';
  });
  const tabSectionArray = childArray.filter(child => {
    return child.type.name === 'TabSection';
  });
  const setActiveTab = (e, index) => {
    props.onTabChange(index);
  };

  const tabSections = tabSectionArray.map((child, itemIndex) => {
    switch (child.type) {
      case TabSection:
        let section = null;
        if (itemIndex === props.activeTab) {
          section = React.cloneElement(child, {
            index: itemIndex,
            activeTab: props.activeTab
          });
        }
        return section;
      default:
        return child;
    }
  });
  const tabButtons = tabButtonarray.map((child, itemIndex) => {
    switch (child.type) {
      case TabButton:
        return React.cloneElement(child, {
          index: itemIndex,
          activeTab: props.activeTab,
          setActiveTab: (e, itemIndex) => props.onTabChange(e, itemIndex)
        });
      default:
        return child;
    }
  });
  const renderTabs = childArray.map((child, itemIndex) => {
    return (
      <TabButton
        key={itemIndex}
        index={itemIndex}
        args={child.props}
        setActiveTab={setActiveTab}
        {...props}
      />
    );
  });

  const renderTabSection = (
    <StyledTabNav {...props}>
      {tabButtons} {tabSections}
    </StyledTabNav>
  );

  return (
    <StyledTab>
      {/* {renderTabs} */}
      {renderTabSection}
    </StyledTab>
  );
};

Tabs.propTypes = {
  /** Description TBD */
  children: PropTypes.node,
  activeTab: PropTypes.number
};

Tabs.defaultProps = {
  activeTab: 0
};

export default Tabs;
