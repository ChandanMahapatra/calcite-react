// Framework and third-party non-ui
import React from 'react';
import PropTypes from 'prop-types';

// Redux operations and local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import {
  StyledArcgisAccountControl,
  StyledArcgisAccountControlAvatar,
  StyledArcgisAccountControlNames,
  StyledArcgisAccountControlFriendlyName,
  StyledArcgisAccountControlUsername
} from './ArcgisAccount-styled';

// App components

// Third-party components (buttons, icons, etc.)

// JSON

// CSS

const ArcgisAccountControl = ({
  avatar,
  fullName,
  username,
  open,
  ...other
}) => {
  return (
    <StyledArcgisAccountControl open={open} {...other}>
      <StyledArcgisAccountControlAvatar>
        {avatar}
      </StyledArcgisAccountControlAvatar>
      <StyledArcgisAccountControlNames>
        <StyledArcgisAccountControlFriendlyName>
          {fullName}
        </StyledArcgisAccountControlFriendlyName>
        <StyledArcgisAccountControlUsername>
          {username}
        </StyledArcgisAccountControlUsername>
      </StyledArcgisAccountControlNames>
    </StyledArcgisAccountControl>
  );
};

ArcgisAccountControl.propTypes = {
  /** User profile avatar image */
  avatar: PropTypes.node,
  /** User's full name */
  fullName: PropTypes.string,
  /** User's AGOL username */
  username: PropTypes.string,
  /** Boolean toggle for popover visibility */
  open: PropTypes.bool
};

ArcgisAccountControl.defaultProps = {};

ArcgisAccountControl.displayName = 'ArcgisAccountControl';

export default ArcgisAccountControl;
