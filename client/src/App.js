import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ProvideAuth } from './Auth/ProvideAuth';
import AuthRoute from './Auth/AuthRouter';

import LandingPage from "./components/views/LandingPage/LandingPage";
import WritePage from "./components/views/WritePage/WritePage";
import PostPage from './components/views/PostPage/PostPage';
import MyPage from './components/views/MyPage/MyPage';

import LoginPage from './components/views/login/login'
import './App.scss';

function App() {
  const style = {
    height: "100%",
    width: "100%"
  }
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // React.useEffect(()=>{
  //   authService.onAuthStateChanged((user) => {
  //     if(user){
  //       setIsLoggedIn(true);
  //     }else{
  //       setIsLoggedIn(false);
  //     }
  //     setInit(true);
  //   });
  // },[]);
  return (
    <ProvideAuth>
      <Router>
        {/* {init ? <AppRouter isLoggedIn={isLoggedIn}/>:"Init"} */}
        <div style={style}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/write" component={WritePage} />
            <Route exact path="/post" component={PostPage} />
            <Route exact path="/login" component={LoginPage} />
            {/* <Route exact path="/mypage" component={MyPage} /> */}
            <Route path="/post/:doc" component={PostPage} />
            <AuthRoute exact path="/mypage" component={MyPage} />
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
