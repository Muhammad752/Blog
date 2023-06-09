import React from 'react';
import './CommentsList.scss';

const ComponentsList = ({ comments }) => {
    return (
        <div className="comments">
            <h3>Commments:</h3>
            {comments.map((comment) => (
                <div
                    className="comment"
                    key={comment.text}
                >
                    <h5>{comment.postedBy}</h5>
                    <p>--{comment.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ComponentsList;
