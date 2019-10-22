import './index.css';
import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {PostList} from './PostList/postList';
import {Loader} from './common/loader';
import {MoreButton} from './common/button';
import {Header} from './Header/header';

const App = () => {
    const [postList, setPostList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sizeLimit, setSizeLimit] = useState(10);
    const URL = 'https://jsonplaceholder.typicode.com/posts';

    const onButtonClick = () => {
        if (sizeLimit >= postList.length) {
            return;
        }

        setSizeLimit(sizeLimit + 10);
    };

    useEffect(() => {
        if (!isLoaded) {
            fetchData();
        }
    }, [isLoaded]);

    const fetchData = () => {
        fetch(URL).then((response) => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }

            response.json().then((data) => {
                setIsLoaded(true);
                setPostList(data);
            });
        }).catch((err) => {
            throw Error(err);
        });
    };

    return (
        <Fragment>
            <Header title={'Today\'s posts'}/>
            {!isLoaded ? <Loader/> : <PostList posts={postList} postsLimit={sizeLimit}/>}
            {sizeLimit < postList.length ? <MoreButton name={'Load more'} onClick={onButtonClick}/> : null}
        </Fragment>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
