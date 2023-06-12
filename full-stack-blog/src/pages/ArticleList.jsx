import articles from './article-content';
import './ArticleList.scss';
import ArticlesList from '../components/ArticlesList';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleList = () => {
    const [articleInfo, setArticleInfo] = useState();
    useEffect(() => {
        async function loadArticle() {
            const response = await axios.get(
                `http://localhost:8000/api/articles/`
            );
            const newArticle = response.data;
            setArticleInfo(newArticle);
        }
        loadArticle();
    }, [articleInfo]);
    if (articleInfo)
        return (
            <>
                <>
                    <h2 className="header">This is articles list page</h2>
                    <ul>
                        <ArticlesList articles={articleInfo} />
                    </ul>
                </>
            </>
        );
};

export default ArticleList;
