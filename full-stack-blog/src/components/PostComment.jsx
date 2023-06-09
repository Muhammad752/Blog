import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import './PostComment.scss';

const PostComment = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const postIt = async () => {
        const response = await axios.post(
            `http://localhost:8000/api/articles/${articleName}/comments`,
            {
                postedBy: name,
                text: commentText,
            }
        );
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    };

    return (
        <div className="postComment d-flex flex-column align-items-start">
            <h3>Add a comment</h3>
            <label htmlFor="">
                Name:
                <input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    type="text"
                />
            </label>
            <label htmlFor="">
                Comment:
                <textarea
                    onChange={(e) =>
                        setCommentText(e.target.value)
                    }
                    value={commentText}
                    name=""
                    id=""
                    cols="50"
                    rows="4"
                ></textarea>
            </label>
            <button
                className="btn btn-dark"
                onClick={postIt}
            >
                Add Comment
            </button>
        </div>
    );
};

export default PostComment;
