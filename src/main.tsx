import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/index.tsx';
import Survey from './components/pages/Survey/index.tsx';
import Results from './components/pages/Results/Results.tsx';
import Header from './components/Header/index.tsx';
import Error from './components/Error/index.tsx';
import Freelances from './components/pages/Freelances/index.tsx';
import GlobalStyle from './utils/style/GlobalStyle.tsx';
import Footer from './components/Footer/index.tsx';
import { ThemeProvider, SurveyProvider } from './utils/context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/survey/:questionNumber" element={<Survey />} />
            <Route path="/survey/results" element={<Results />} />
            <Route path="/freelances" element={<Freelances />} />
            <Route path="*" element={<Error />}></Route>
          </Routes>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
