import React from 'react';
import {PostListItem} from './postListItem';
import T from 'prop-types';

export const PostList = ({posts, postsLimit}) => {
    const renderPosts = () => {
        if (posts && posts.length) {
            let postsToShow = posts.slice(0, postsLimit);

            return postsToShow.map((post, index) =>
                <PostListItem key={post.id} index={index} id={post.id} title={post.title} body={post.body}/>
            )
        } else {
            return <div className="noDataFound">No data</div>;
        }
    };

    return (
        <ul className='postsList'>
            {renderPosts()}
        </ul>
    );
};

PostList.defaultProps = {posts: []};
PostList.propTypes = {
    posts: T.arrayOf(T.shape({
        id: T.number.isRequired,
        title: T.string.isRequired,
        body: T.string.isRequired
    })),
    postsLimit: T.number.isRequired
};