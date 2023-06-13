import { Container } from 'react-bootstrap';

import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';

import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

import { createBrowserHistory } from 'history';

import { BrowserRouter, Route } from 'react-router-dom';
import AddEditBookScreen from './screens/AddEditBookSecreen';
import NotFound from './screens/NotFound';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

export const history = createBrowserHistory();

function App() {
  const admin = useSelector((state) => state.user.isAdmin);
  return (
    <BrowserRouter history={history}>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/login' component={LoginScreen}></Route>

            <Route path='/placeOrder' component={PlaceOrderScreen}></Route>
            <Route path='/shipping' component={ShippingScreen}></Route>
            <Route path='/userProfile' component={ProfileScreen} />
            <Route path='/register' component={RegisterScreen}></Route>
            <Route path='/product/:id' component={ProductScreen}></Route>
            {admin && <Route path='/admin/editBook/:id' component={AddEditBookScreen}></Route>}
            <Route path='/cart' component={CartScreen}></Route>
            {admin && <Route path='/admin/addBook' component={AddEditBookScreen}></Route>}
            <Route path='/' component={HomeScreen} exact></Route>
            <Route path='*' component={NotFound}></Route>
          </Switch>
        </Container>
      </main>
      <Footer> </Footer>
    </BrowserRouter>
  );
}

export default App;
