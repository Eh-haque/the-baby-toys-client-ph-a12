import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  NavLink
} from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import MakeAdmin from './AdminSections/MakeAdmin/MakeAdmin';
import AddService from './AdminSections/AddService/AddService';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageOrders from './AdminSections/ManageOrders/ManageOrders';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../hooks/useAuth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ManageProducts from './AdminSections/ManageProducts/ManageProducts';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MyOrders from './GeneralSections/MyOrders/MyOrders';
import PayCost from './GeneralSections/PayCost/PayCost';
import PaymentIcon from '@mui/icons-material/Payment';
import MyReview from './GeneralSections/MyReview/MyReview';
import AdminRoute from '../Authenticate/AdminRoute/AdminRoute';
import PrivateRoute from '../Authenticate/PrivateRoute/PrivateRoute';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Dashboard() {
  const { admin, logout, user } = useAuth();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  let { path, url } = useRouteMatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', overflow: 'overlay' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>({user.displayName})</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <NavLink style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }} to={`${url}`} >
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
          </NavLink>
          <Divider />

          {admin && <Box>
            <NavLink style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }} to={`${url}/make_admin`}>
              <ListItem button>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Make Admin" />
              </ListItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }} to={`${url}/add_services`}>
              <ListItem button>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Add Services" />
              </ListItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }} to={`${url}/manage_orders`}>
              <ListItem button>
                <ListItemIcon>
                  <ProductionQuantityLimitsIcon />
                </ListItemIcon>
                <ListItemText primary="Manage All Order" />
              </ListItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }} to={`${url}/manage_products`}>
              <ListItem button>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Manage All Product" />
              </ListItem>
            </NavLink>
          </Box>}

          {/* general sections */}
          {!admin && <Box>
            <NavLink style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }} to={`${url}/my_orders`}>
              <ListItem button>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="My Orders" />
              </ListItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }} to={`${url}/pay_cost`}>
              <ListItem button>
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText primary="Pay Cost" />
              </ListItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }} to={`${url}/my_review`}>
              <ListItem button>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="My Review" />
              </ListItem>
            </NavLink>
          </Box>}

          <Divider />

          <Link style={{ textDecoration: 'none' }} to="/home">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon sx={{ color: '#551a8b' }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'red' }} />
            </ListItemIcon>
            <ListItemText sx={{ color: 'red' }} primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Switch>
          <Route exact path={path}>
            <h3>Please select a topic.</h3>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
              enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
              imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
              Convallis convallis tellus id interdum velit laoreet id donec ultrices.
              Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
              adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
              nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
              feugiat vivamus at augue. At augue eget arcu dictum varius duis at
              consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
              sapien faucibus et molestie ac.
            </Typography>
          </Route>
          <AdminRoute path={`${path}/make_admin`}>
            <MakeAdmin />
          </AdminRoute>
          <AdminRoute path={`${path}/add_services`}>
            <AddService />
          </AdminRoute>
          <AdminRoute path={`${path}/manage_orders`}>
            <ManageOrders />
          </AdminRoute>
          <AdminRoute path={`${path}/manage_products`}>
            <ManageProducts />
          </AdminRoute>

          {/* general sections */}
          <PrivateRoute path={`${path}/my_orders`}>
            <MyOrders />
          </PrivateRoute>
          <PrivateRoute path={`${path}/pay_cost`}>
            <PayCost />
          </PrivateRoute>
          <PrivateRoute path={`${path}/my_review`}>
            <MyReview />
          </PrivateRoute>
        </Switch>
      </Box>
    </Box >
  );
}
