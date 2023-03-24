import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress,setProgress]=useState(0)

    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#dc3545'
        progress={progress}
        
      />
        <Routes>
          <Route exact path="/" element = {<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} country ="in" category="General"/>}/>
          <Route exact path="/Business" element = {<News setProgress={setProgress} apiKey={apiKey} key="Business" pageSize={6} country ="in" category="Business"/>}/>
          <Route exact path="/Entertainment" element = {<News setProgress={setProgress} apiKey={apiKey} key="Entertainment" pageSize={6} country ="in" category="Entertainment"/>}/>
          <Route exact path="/Health" element = {<News setProgress={setProgress} apiKey={apiKey} key="Health" pageSize={6} country ="in" category="Health"/>}/>
          <Route exact path="/Science" element = {<News setProgress={setProgress} apiKey={apiKey} key="Science" pageSize={6} country ="in" category="Science"/>}/>
          <Route exact path="/Sports" element = {<News setProgress={setProgress} apiKey={apiKey} key="Sports" pageSize={6} country ="in" category="Sports"/>}/>
          <Route exact path="/Technology" element = {<News setProgress={setProgress} apiKey={apiKey} key="Technology" pageSize={6} country ="in" category="Technology"/>}/>
        </Routes>
        </Router>
      </div>
    )
  }

  export default App;

