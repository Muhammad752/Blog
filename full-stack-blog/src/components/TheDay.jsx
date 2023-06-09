import React from 'react';
import { useParams } from 'react-router-dom';

const TheDay = () => {
    const { title } = useParams();
    return (
        <>
            {/* <h3>{note.title}</h3>
            <p>{note.text}</p> */}
        </>
    );
};

export default TheDay;
