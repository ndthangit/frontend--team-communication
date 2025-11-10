import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import { useKeycloak } from "@react-keycloak/web";
import styles from './AccountMenu.module.css';

interface AccountMenuProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    anchorRef: React.RefObject<HTMLButtonElement | null>;
    avatarBgColor: string;
    userInitial: string;
    userName: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
                                                     open,
                                                     setOpen,
                                                     id,
                                                     anchorRef,
                                                     avatarBgColor,
                                                     userInitial,
                                                     userName
                                                 }) => {
    const { keycloak } = useKeycloak();
    const accountUrl = keycloak.createAccountUrl();


    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        keycloak.logout({
            redirectUri: window.location.origin
        });
        handleClose();
    };

    const handleProfile = () => {
        console.log("Open profile");

        handleClose();
        window.location.href = accountUrl;
    };

    const handleSettings = () => {
        console.log("Open settings");
        handleClose();
    };

    const handleAddAccount = () => {
        console.log("Add account");
        handleClose();
    };

    return (
        <Menu
            anchorEl={anchorRef.current}
            id={id}
            open={open}
            onClose={handleClose}
            // Xóa onClick={handleClose} để menu không đóng khi click vào item
            className={styles.accountMenu}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
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
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose} className={styles.menuItem}>
                <Avatar sx={{ background: avatarBgColor }}>{userInitial}</Avatar>
                <div className={styles.userInfo}>
                    <div className={styles.userName}>{userName}</div>
                    <div className={styles.userEmail}>{keycloak.tokenParsed?.email || ""}</div>
                </div>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleProfile} className={styles.menuItem}>
                <ListItemIcon>
                    <Person fontSize="small" />
                </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem onClick={handleSettings} className={styles.menuItem}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={handleAddAccount} className={styles.menuItem}>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
            </MenuItem>
            <MenuItem onClick={handleLogout} className={styles.menuItem}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
};

export default AccountMenu;