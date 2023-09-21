import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import VitalsReport from './VitalsReport';
import { Provider } from 'react-redux'
import ReduxStore from './ReduxService/ReduxStore';

import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import DataModelPage from './DataModel';

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "/modalA",
    element: (<DataModelPage />),
  },
  {
    path: "/modalB",
    element: (<DataModelPage />),
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <React.StrictMode>
      <Provider store={ReduxStore}>
        <RouterProvider router={BrowserRouter} />
      </Provider>
    </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: VitalsReport(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
VitalsReport();
