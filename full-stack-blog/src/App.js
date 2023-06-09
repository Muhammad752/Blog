import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import NavBar from './navbar/NavBar';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Article from './pages/Articles';
import ArticleList from './pages/ArticleList';
import NotFoundPage from './pages/NotFoundPage';
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage from './pages/LoginPage';
import DailyNotes from './pages/Daily_notes';
import TheDay from './components/TheDay';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <div id="page-body">
                {/* <h1>My Awesome Blog</h1> */}
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/about"
                        element={<About />}
                    />
                    <Route
                        path="/articles"
                        element={<ArticleList />}
                    />
                    <Route
                        path="/article/:articleId"
                        element={<Article />}
                    />
                    <Route
                        path="/daily_notes"
                        element={<DailyNotes />}
                    />
                    <Route
                        path="/createAccount"
                        element={<CreateAccountPage />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="/theday/:title"
                        element={<TheDay />}
                    />
                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
