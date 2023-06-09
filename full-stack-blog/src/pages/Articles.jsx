import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import articles from './article-content';
import PostComment from '../components/PostComment';
import ComponentsList from '../components/ComponentsList';
import NotFoundPage from './NotFoundPage';
import useUser from '../hooks/useUser';
import './Articles.scss';

const Articles = () => {
    // const params=useParams();
    // const articleId=params.articleId;
    const { articleId } = useParams();
    const { user, isLoading } = useUser();
    // const article = articles.find(
    //     (article) => article.name === articleId
    // );
    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0,
        comments: [],
    });
    useEffect(() => {
        async function loadArticle() {
            const token = user && (await user.getIdToken());
            console.log('user is ' + user);
            console.log(token);
            const headers = token ? { authtoken: token } : {};
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

    const addUpvote = async () => {
        const res = await axios.put(
            `http://localhost:8000/api/articles/${articleId}/upvote`
        );
        setArticleInfo(res.data);
    };

    if (!articleInfo) {
        return <NotFoundPage />;
    }

    return (
        <>
            <h2 className="article-title">{articleInfo.title}</h2>
            <div
                className="ms-5"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                <h5>The articles has {articleInfo.upvotes} upvote(s)</h5>
                {user ? (
                    <button
                        className="btn btn-secondary"
                        onClick={addUpvote}
                    >
                        Upvote +
                    </button>
                ) : (
                    <button>Log in to upvote</button>
                )}
            </div>
            {/* {article.content.map((paragraph, index) => (
                <p
                    key={index}
                    className="article-body"
                    style={{ margin: '15px' }}
                >
                    {paragraph}
                </p>
            ))} */}
            {articleInfo.content}
            <ComponentsList comments={articleInfo.comments} />
            {user ? (
                <PostComment
                    articleName={articleId}
                    onArticleUpdated={(updatedArticle) =>
                        setArticleInfo(updatedArticle)
                    }
                />
            ) : (
                <button>Login to add a comment</button>
            )}
        </>
    );
};
export default Articles;
