import React from 'react';
import YouTube from 'react-youtube';
import './Modal.css';
function Modal({ onclick, trailerUrl, opts }) {
    return (
        <div className="modal" onClick={onclick}>
            <div className="modal__contents">
                <YouTube
                    className="modal__iframe"
                    videoId={trailerUrl}
                    opts={opts}
                />
            </div>
        </div>
    );
}

export default Modal;
