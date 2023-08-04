import jwtDecode from 'jwt-decode';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import './app.css';
import configureStore from './configureStore';
import { setToken, setUser } from './containers/App/actions';
import App from './containers/App/App';

const { store, history } = configureStore({});

const tokenWithBearer = localStorage.getItem('token');
if (tokenWithBearer) {
  const token = tokenWithBearer.split(' ')[1];
  try {
    const decoded = jwtDecode(token);
    if (
      !(
        typeof decoded === 'object' &&
        typeof decoded.exp === 'number' &&
        decoded.exp > Date.now() / 1000
      )
    ) {
      console.log('expired');
      localStorage.removeItem('token');
    } else {
      const routes = JSON.parse(localStorage.getItem('routes'));
      const user = {
        id: decoded.id,
        name: decoded.name,
        avatar: decoded.avatar,
        email: decoded.email,
        roles: decoded.roles,
        email_verified: decoded.email_verified,
        routes: routes,
        image: decoded.image,
      };
      store.dispatch(setToken(tokenWithBearer));
      store.dispatch(setUser(user));
    }
  } catch (error) {
    console.log('error', { error });
    localStorage.removeItem('token');
  }
}

const app = document.getElementById('app');
const root = createRoot(app);

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
);
