import React from 'react';

export const PostListItem = (props) => {
    return (
        <li className="postListItem">
            <article>
                <h4>{1 + props.index + '. ' + props.title.toLocaleUpperCase()}</h4>
                <div>{props.body}</div>
            </article>
        </li>
    );
};