import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavBar from './components/NavBap/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => (
  <BrowserRouter>
    <GoogleOAuthProvider clientId="457770258473-mqhlkbqaj5gh77c5nsmsgb152guk09ts.apps.googleusercontent.com">
      <Container maxWidth="lg">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

export default App;
