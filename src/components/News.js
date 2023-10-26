import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';

const News = (props) => {
  // articles = [];

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const [progress, setprogress] = useState(0);

  const updateState = async () => {
    setprogress(10);

    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(apiUrl);
    let dataJson = await data.json();
    setarticles(dataJson.articles);
    settotalResults(dataJson.totalResults);
    setloading(false);
    setprogress(100);
  };

  useEffect(() => {
    updateState();
    //eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setprogress(10);
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${
      props.category
    }&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
    setPage(page + 1); // Increment page by 1
    let data = await fetch(apiUrl);
    let dataJson = await data.json();
    setarticles(articles.concat(dataJson.articles));
    settotalResults(dataJson.totalResults);
    setprogress(100);
  };

  return (
    <>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        onLoaderFinished={() => setprogress(0)}
      />
      <div className='container my-3'>
        <h1 className='text-center' style={{ marginTop: `75px` }}>
          Top Headlines
        </h1>
        <div className='text-center'>
          {loading && <Spinner />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults} // Replace with a condition based on your data source
            loader={<Spinner />}
            endMessage={<p>No more data to load.</p>}
          >
            <div className='row'>
              {articles.map((element, index) => {
                const uniqueKey = `${element.url}_${index}`;
                return (
                  <NewsItem
                    key={uniqueKey}
                    title={element.title}
                    description={element.description}
                    imgurl={element.urlToImage}
                    newsUrl={element.url}
                    publishedAt={element.publishedAt}
                    author={element.author}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
