//import Menu from './components/Menu';
import Page from './pages/Page';
import Home from './pages/Home';
import Commissions from './pages/Commissions';
import About from './pages/About';
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import CRUD from './pages/CRUD'
import SignIn from './pages/SignIn'
import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        {/* <IonSplitPane contentId="main"> */}
          {/* <Menu /> */}
          <IonRouterOutlet id="main">
            <Route path="/Commissions" name='commissions' component={Commissions} exact />
            <Route path="/About" name='about' component={About} exact />
            <Route path="/Portfolio" name='portfolio' component={Portfolio} exact />
            <Route path="/Contact" name='contact' component={Contact} exact />
            <Route path="/CRUD" name='CRUD' component={CRUD} exact /> 
            <Route path="/Home" name='hahahha' component={Home} exact /> 
            <Route path="/Signin" name="wedsfgnfdi" component={SignIn} exact />
            <Route path="/page/:name" component={Page} exact />
            <Redirect from="/" to="/Home" exact />
          </IonRouterOutlet>
        {/* </IonSplitPane> */}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
