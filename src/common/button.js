import React from 'react';

export const MoreButton = ({name, onClick}) => {
    return (
        <button type='button' className='moreButton' onClick={onClick}>{name}</button>
    );
};