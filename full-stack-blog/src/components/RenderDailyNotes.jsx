import React from 'react';
import './RenderDailyNotes.scss';

const RenderDailyNotes = ({ notes }) => {
    return (
        <div>
            {notes.map((element) => (
                <div
                    className="daily_note"
                    key={element._id}
                >
                    <div className="content">
                        <h5>{element.title}</h5>
                        <p>
                            {element.text}
                            ...
                        </p>
                    </div>
                    <div className="datetime">
                        <p className="date">
                            {new Date(
                                element.date
                            ).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <p className="time">
                            {new Date(
                                element.date
                            ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    </div>
                    <div className="buttons">
                        <button className="btn btn-secondary">
                            Edit
                        </button>
                        <button className="btn btn-danger">
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RenderDailyNotes;
