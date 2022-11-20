/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { CssVarsProvider } from '@mui/joy/styles';
import VerifyPage from './pages/VerifyPage';

export function App() {
  const { i18n } = useTranslation();
  return (
    <CssVarsProvider>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="IDme"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta
            name="description"
            content="A secure way to identify for real humans"
          />
        </Helmet>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/verify" element={<VerifyPage />} />
        </Routes>
        <GlobalStyle />
      </BrowserRouter>
    </CssVarsProvider>
  );
}
