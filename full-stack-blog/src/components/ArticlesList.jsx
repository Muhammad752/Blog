import { Link } from 'react-router-dom';
import React from 'react';

const ArticlesList = ({articles}) => {
    return (
        <>
        {articles.map(value=>(
            <Link key={value.name} className="articles_in_list" to={`/article/${value.name}`}>
                <p>
                    {value.name.toUpperCase()}
                </p>
                <p className="content-preview">
                    {value.content[0].substring(0,150)}...
                </p>
            </Link>
        ))}
        </>
    );
}

export default ArticlesList;
