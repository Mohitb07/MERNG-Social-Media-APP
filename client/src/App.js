import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar'
import { AuthProvider } from './context/auth';
import AuthRoutes from './utils/AuthRoutes';

function App() {
  return (
    <AuthProvider>
        <Router>
          <Container>
            <Navbar/>
            <Route exact path="/" component={Home}/>
            <AuthRoutes exact path="/login" component={Login}/>
            <AuthRoutes exact path="/register" component={Register}/>
          </Container>
        </Router>
    </AuthProvider>
  );
}

export default App;
