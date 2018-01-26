import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from './layout';

ReactDom.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>,
  document.getElementById('app')
);
