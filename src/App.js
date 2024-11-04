import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Authentication from './screens/Authentication';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './screens/ErrorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/signup" element={<Authentication mode="signup" />} />
      <Route path="/signin" element={<Authentication mode="signin" />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
