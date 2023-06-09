import axios from 'axios';
import React, { useState, useEffect } from 'react';
import RenderDailyNotes from '../components/RenderDailyNotes';

const DailyNotes = () => {
    const [notes, setNotes] = useState();

    useEffect(
        (ef) => {
            async function loadArticle() {
                const response = await axios.get(
                    `http://localhost:8000/api/daily_notes/getAll`
                );
                const newNote = response.data;
                setNotes(newNote);
            }
            loadArticle();
        },
        [notes]
    );
    if (notes) {
        return (
            <div>
                <RenderDailyNotes notes={notes} />
            </div>
        );
    }
};

export default DailyNotes;
