import React from 'react';
import './App.css';
import MainPage from "./index/MainPage";
import Experiments from "./experiments/Experiments";


function App() {
    return (
        <div className="App">
            <MainPage/>
            <Experiments/>
        </div>
    );
}

export default App;
