import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidebar from "./components/parts/Sidebar";
import News from "./components/News";
import Dialogs from "./components/Dialogs";
import Comments from "./components/Comments";
import Sign from "./components/Sign";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";
import AccountsStore from "./stores/AccountsStore";

const stores = {
    AccountsStore: new AccountsStore()
};

ReactDOM.render(
  <React.StrictMode>
      <Provider {...stores}>
          <BrowserRouter>
              <Sidebar>
                  <Switch>
                      <Route exact path="/" component={News} />
                      <Route path="/dialogs/:id(\d+)?" component={Dialogs} />
                      <Route path="/settings" component={Settings} />
                      <Route path="/comments" component={Comments} />
                      <Route path="/sign" component={Sign} />
                      <Route component={NotFound} />
                  </Switch>
              </Sidebar>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
