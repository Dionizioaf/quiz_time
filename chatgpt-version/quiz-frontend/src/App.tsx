import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
// import UserScreen from './components/UserScreen';
// import QuestionScreen from './components/QuestionScreen';
// import RankingScreen from './components/RankingScreen';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminPanel />} />
                {/* <Route path="/user" element={<UserScreen />} />
                <Route path="/question" element={<QuestionScreen />} />
                <Route path="/ranking" element={<RankingScreen />} /> */}
            </Routes>
        </Router>
    );
};

export default App;