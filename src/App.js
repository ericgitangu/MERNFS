import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Articles from './pages/Articles'
import ArticlesListPage from './pages/ArticlesListPage'
import NavBar from './NavBar'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="articles" element={<Articles />}>
            <Route path=":name" element={<Articles/>} />
          </Route>
          <Route path ="articles-list" element={<ArticlesListPage/>} />
          <Route path ="about" element={<About/>} />
          <Route path ="/" element={<HomePage/>} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
              }/>

        </Routes>  
      </div>
    </Router>
  );
}

export default App;
