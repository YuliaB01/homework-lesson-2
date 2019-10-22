import './index.css';
import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {PostList} from './PostList/postList';
import {Loader} from './common/loader';
import {MoreButton} from './common/button';
import {Header} from './common/header';

const App = () => {
    const [postList, setPostList] = useState([]);
    const [fullPostList, setFullPostList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sizeLimit, setSizeLimit] = useState(10);
    const [inputValue, setInputValue] = useState('');

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
                setFullPostList(data);
                setPostList(data);
            });
        }).catch((err) => {
            throw Error(err);
        });
    };

    useEffect(() => {
        if (!inputValue) {
            setPostList(fullPostList);
            return;
        }

        const filteredPosts = fullPostList.filter(post => {
            return post.title.indexOf(inputValue.toLowerCase()) !== -1
                || post.body.indexOf(inputValue.toLowerCase()) !== -1;
        });

        setPostList(filteredPosts);
    }, [inputValue, fullPostList]);

    const onValueChange = (e) => {
        setInputValue(e.target.value.toLowerCase().trim());
    };

    return (
        <Fragment>
            <Header title={'Today\'s posts'}/>
            <div className='searchWrapper'>
                <input type='text' value={inputValue} onChange={onValueChange} placeholder='Start typing...'/>
            </div>

            {!isLoaded ? <Loader/> : <PostList posts={postList} postsLimit={sizeLimit}/>}
            {sizeLimit < postList.length ? <MoreButton name={'Load more'} onClick={onButtonClick}/> : null}
        </Fragment>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
