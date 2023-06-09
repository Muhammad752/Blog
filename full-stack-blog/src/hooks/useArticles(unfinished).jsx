//user=useUser()

import React from 'react';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useUser = () => {
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

    return { notes };
};

export default useUser;
