import { Routes, Route } from 'react-router-dom';
import './App.scss';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from './containers/home-page/home-page';
import { LandingPage } from './containers/landing-page/landing-page';
// import {theme} from './theme'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import store from './store';
import { Tab, Tabs, Avatar } from '@mui/material';
import { Profile } from './components/profile/profile';


function App() {
  const navigate = useNavigate();
  const [showTabs, setShowTabs] = useState(false);
  const [tab, setTab] = useState("0");
  const location = useLocation();


  useEffect(() => {
    const user = store.getState().userDetails;
    if (Object.keys(user).length > 0) {
      setShowTabs(true);
      navigate('/dashboard')
    }
    else {
      if (location.pathname.includes('createPass')) {
        return;
      }
      navigate('/login')

    }
  }, [])



  store.subscribe(() => {
    const user = store.getState().userDetails;
    if (Object.keys(user).length > 0) {
      setShowTabs(true);
      navigate('/dashboard');
    }
    else {
      setShowTabs('');
    }

  });

  const changeRoute = (i)=> {
    switch(i) {
      case '0':
        navigate('/dashboard')
        break;
      case '1':
        navigate('/profile');
        break;
      case '2':
          localStorage.removeItem('userDetails');
          navigate('/login');
          store.dispatch({type:'SET_USER',userDetails:{}})
        break;
      default:
        break;

    }
  }




  return (
    // <ThemeProvider theme={theme}>
    <div className="App" style={{ display: 'flex', flexDirection:'column' }}>
     { showTabs && <div className="navbar" style={{ margin: '1em 2em'}}>
        <Tabs value={tab} onChange={(e, i) => {setTab(i); changeRoute(i);}}>
          <Tab label="Home" value="0" />
          <Tab label="Profile" value="1">  
           <div className="avatar">
            <Avatar src="/static/images/avatar/1.jpg" onClick={() => navigate('/profile')} />
          </div>
          </Tab>
          <Tab label="Logout" value="2"></Tab>
        </Tabs>
        
      </div> }
      <div className="app-right-pane" style={{ width: '100%' }}>
        <Routes>
          <Route path='*' element={<LandingPage></LandingPage>}></Route>
          <Route path='dashboard' element={<Home></Home>}></Route>
          <Route path='profile' element={<Profile></Profile>}></Route>
          {/* <Route path='messages' element={<Messages />}></Route>
          <Route path="plan" element={<SubscriptionPlans/>}></Route>
          <Route path="notifications" element={<Notifications/>}></Route>
          <Route element={<div>Not found</div>}></Route> */}
        </Routes>
      </div>

    </div>
    // </ThemeProvider>
  );
}

export default App;
