import './utils/styles/main.scss';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import ContactList from './components/ContactList/ContactList';
import ContactInfo from './components/ContactInfo/ContactInfo';

// Create app and use browser router to know which conatct to display

const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <>
                    <ContactList />
                    <Route path="/:id" component={ ContactInfo } />
                </>
            </BrowserRouter>
        </div>
    );
}

export default App;