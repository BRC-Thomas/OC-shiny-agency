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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey/:questionNumber" element={<Survey />} />
        <Route path="/survey/results" element={<Results />} />
        <Route path="/freelance" element={<Freelances />} />
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
