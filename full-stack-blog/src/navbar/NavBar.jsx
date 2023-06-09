import React from 'react';
import { Link } from 'react-router-dom';
import { MdPostAdd } from 'react-icons/md';
import { FaRegAddressBook } from 'react-icons/fa';
import AddDailyNote from '../components/AddDailyNote';
import './NavBar.scss';

const NavBar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/about">About</Link>
                    </li>

                    <li>
                        <Link to="/articles">Articles</Link>
                    </li>
                    <li>
                        <Link to="/daily_notes">Daily</Link>
                    </li>
                </ul>
                <div className="newArt">
                    <button
                        type="button"
                        className="m-2 btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        <FaRegAddressBook /> Add the day
                    </button>
                    <button className="m-2 btn btn-success">
                        <MdPostAdd /> Add an article
                    </button>
                    <AddDailyNote />
                </div>
            </nav>
        </>
    );
};

export default NavBar;
