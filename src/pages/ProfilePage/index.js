import React from 'react';
import Nav from '../../components/Nav/Nav';
import './ProfilePage.css';
import * as selectors from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { auth } from '../../firebaseConfig';

function ProfilePage() {
    const user = useSelector(selectors.selectUser);

    return (
        <div className="profilePage">
            <Nav />
            <div className="profilePage__body">
                <h1>Edit Profile</h1>
                <div className="profilePage__info">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="profile-avatar"
                    />
                    <div className="profilePage__details">
                        <h2>{user.email}</h2>
                        <div className="profilePage__plans">
                            <h3>Plans</h3>
                            <button
                                onClick={() => auth.signOut()}
                                className="profilePage__signOut"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
