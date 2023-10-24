import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';

News.defaultProps = {
  pageSize: 9,
  category: 'general',
};

const categories = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

function App() {
  const myAPI = process.env.REACT_APP_API_KEY;
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            exact
            path={`/`}
            element={
              <News
                key='general'
                pageSize={9}
                category='general'
                apiKey={myAPI}
              />
            }
          />
          {categories.map((category) => (
            <Route
              exact
              path={`/${category}`}
              key={category}
              element={
                <News
                  key={category}
                  pageSize={9}
                  category={category}
                  apiKey={myAPI}
                />
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
