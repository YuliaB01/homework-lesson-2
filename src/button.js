import React from 'react';

export const MoreButton = ({onClick}) => {
    return (
        <button type='button' className='moreButton' onClick={onClick}>Load more</button>
    );
};