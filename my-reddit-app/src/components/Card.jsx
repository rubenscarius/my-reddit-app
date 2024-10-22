import React from "react"

export default function Card({ username, title, text, likes, likesRatio }) {
    return (
        <>
            <div className="card-container">
                <div className="card-content">
                    <h3 className="card-username">{username}</h3>
                    <h2 className="card-title">{title}</h2>
                    <p className="card-text">{text}</p>
                    <img src="" alt="" />
                </div>
                <img src="" alt="" className="likes" /><span>{likes}</span>
                <img src="" alt="" className="likes-ratio" /><span>{likesRatio}</span>
            </div>
        </>
    )
}