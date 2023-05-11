import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  padding: 10px 20px; /* set padding as desired */
`;

export default function ProfileIcon() {
  const anchorRef = useRef(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleClick = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const handleClose = () => {
    setIsNavExpanded(false);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          ref={anchorRef}
          onClick={handleClick}
          size="small"
          sx={{ mr: 2, mt: -0.3 }}
          aria-controls={isNavExpanded ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isNavExpanded ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorRef.current}
        open={isNavExpanded}
        onClose={handleClose}
        PaperProps={{
          width: '1px',
          maxHeight: '2px',
          elevation: 10,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',

            mt: 1,
            ml: -0.2,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ py: '0px' }}>
          <LoginIcon sx={{ mr:1 }}></LoginIcon>
          <StyledLink to="/register" onClick={() => window.reload()}>
            Sign In / Sign Up
          </StyledLink>
        </MenuItem>
        {/* <Divider /> */}
        {/* <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}
      </Menu>
    </>
  );
}
