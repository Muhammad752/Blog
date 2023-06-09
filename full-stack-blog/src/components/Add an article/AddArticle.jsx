import axios from 'axios';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';

const AddArticle = () => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [words, setWords] = useState();
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
    });

    function giveLength(str) {
        return str.length;
    }

    const postIt = async () => {
        const date = new Date();
        const res = await axios.post(
            'http://localhost:8000/api/articles/post',
            {
                title: title,
                name: name,
                date: date,
                content: message,
                upvotes: 0,
                comments: [],
            }
        );
        setMessage('');
        setTitle('');
    };

    return (
        <div
            className="modal fade"
            id="articleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                        >
                            Write your expirience
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="ms-4 d-flex flex-column">
                        <p>{currentTime.toDateString()}</p>
                        <p>{currentTime.toLocaleTimeString()}</p>
                    </div>
                    <div className="modal-body">
                        <div className="ms-2 d-flex mb-2 gap-3">
                            <span>Name:</span>
                            <input
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                        <div className="ms-2 d-flex mb-2 gap-3">
                            <span>Title:</span>
                            <input
                                autoFocus
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                        <textarea
                            className="p-2"
                            autoCorrect="on"
                            autoCapitalize="on"
                            placeholder="Write about your day..."
                            name=""
                            id=""
                            cols="60.5"
                            rows="10"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                setWords(e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="modal-footer">
                        <h3 className="">{words ? words.length : ' '}</h3>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            onClick={postIt}
                            type="button"
                            className="btn btn-primary"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddArticle;
