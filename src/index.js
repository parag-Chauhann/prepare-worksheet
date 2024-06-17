import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import App from './App';
import Login from './Components/Login and SignUp/Login2';
import Protected from './Components/Protected/Protected';
import Home from './Components/Worksheet_generated_details/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route path="signup" element={<SignUp />} /> */}
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Protected />}>
        <Route path="/" index element={<Home />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
