import React from 'react';
import {PostListItem} from '../PostListItem/postListItem';
import T from 'prop-types';

export const PostList = ({posts, postsLimit}) => {
    const renderPosts = () => {
        if (posts && posts.length) {
            let postsToShow = posts.slice(0, postsLimit);

            return postsToShow.map(post =>
                <PostListItem key={post.id} id={post.id} title={post.title} body={post.body}/>
            )
        } else {
            return <div className="noDataFound">No data</div>;
        }
    };

    return (
        <ol className='postsList'>
            {renderPosts()}
        </ol>
    );
};

PostList.defaultProps = {posts: []};
PostList.propTypes = {
    posts: T.arrayOf(T.exact),
    postsLimit: T.number
};