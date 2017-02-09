import { darkBlack, grey600 } from 'material-ui/styles/colors';
import { MuiTheme } from 'material-ui/styles';
import * as Url from 'url';
import { siteState } from './reducers/site';
import AppState from './stateI';
import { apiHref, getSite, getTheme } from './lib/hexoApi';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Store } from 'redux';
import createStore from './create-store';
import App from './components/app/app'
import reducer from './reducers/reducer'

const defaultMuiTheme:MuiTheme = {
  appBar:{
  }
}

injectTapEventPlugin();

var style = require('./main.less');

const Main = ({store}: { store: Store<any> }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

let store: Store<AppState>;

Promise.all([getSite() as siteState, getTheme()]).then((res) => {
  let u = new URL(apiHref);
  res[0].siteUrl = u.protocol + '//' + u.host;
  store = createStore({ site: res[0], theme: {
    ...res[1],
    muiTheme:getMuiTheme(defaultMuiTheme)
  } })
  ReactDOM.render(
    <Main store={store} />,
    document.getElementById('app')
  );
})

export default store;