import articles from './article-content';
import './ArticleList.scss';
import ArticlesList from '../components/ArticlesList';
import { useEffect, useState } from 'react';

const ArticleList = () => {
    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0,
        comments: [],
    });
    useEffect(() => {
        async function loadArticle() {
            const token = user && (await user.getIdToken());
            console.log('user is ' + user);
            console.log(token);
            const headers = token
                ? { authtoken: token }
                : {};
            const response = await axios.get(
                `http://localhost:8000/api/articles/${articleId}`,
                {
                    headers,
                }
            );
            const newArticle = response.data;
            setArticleInfo(newArticle);
        }
        loadArticle();
    }, []);
    console.log(articleInfo);
    return (
        <>
            {articleInfo.map((value) => (
                <>
                    <h2 className="header">
                        This is articles list page
                    </h2>
                    <ul>
                        <ArticlesList articles={articles} />
                    </ul>
                </>
            ))}
        </>
    );
};

export default ArticleList;
