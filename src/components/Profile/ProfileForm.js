import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../../Store/AuthContext';
import classes from './ProfileForm.module.css';
import { useContext, useRef } from 'react';
const ProfileForm = () => {

  const history=useHistory();
  const newPasswordInputRef=useRef();
  const authCtx=useContext(AuthContext)
  const submitHandler=(event)=>{
    event.preventDefault();
    const enteredNewPassword=newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDQDOat92dVpaWbJMlR1I_cITd6DuiKXF8',{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:enteredNewPassword,
        retureSecureToken:true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      history.replace('/');
    })
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
