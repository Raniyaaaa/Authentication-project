import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../Store/AuthContext';
import { useHistory } from 'react-router-dom';

const MainNavigation = () => {

  const history=useHistory()

  const logoutHandler=()=>{
    authCtx.logout();
    
  }

  const authCtx=useContext(AuthContext)
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {authCtx.isLoggedIn &&(
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {authCtx.isLoggedIn&&(
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
