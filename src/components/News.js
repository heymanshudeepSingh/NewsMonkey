import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';

export default class News extends Component {
  // articles = [];
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      progress: 0,
    };
  }

  async componentDidMount() {
    this.setProgress(10);

    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&page=${this.state.page}&apiKey=fd7fc2daecba428fb5009ffe1cf164a9&page=1&pagesize=${this.props.pageSize}`;
    let data = await fetch(apiUrl);
    let dataJson = await data.json();
    this.setState({
      articles: dataJson.articles,
      totalResults: dataJson.totalResults,
      loading: false,
    });
    this.setProgress(100);
  }
  async updateState() {
    this.setProgress(10);

    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fd7fc2daecba428fb5009ffe1cf164a9&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(apiUrl);
    let dataJson = await data.json();
    this.setState({
      articles: dataJson.articles,
      totalResults: dataJson.totalResults,
      loading: false,
    });
    this.setProgress(100);
  }

  HandlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updateState();
  };

  HandleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateState();
  };

  fetchMoreData = async () => {
    this.setProgress(10);

    this.setState({
      page: this.state.page + 1,
    });
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fd7fc2daecba428fb5009ffe1cf164a9&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(apiUrl);
    let dataJson = await data.json();
    this.setState({
      articles: this.state.articles.concat(dataJson.articles),
      totalResults: dataJson.totalResults,
      // loading: false,
    });
    this.setProgress(100);

  };

  setProgress = (prog) => {
    this.setState({ progress: prog });
  };

  render() {
    return (
      <>
        <LoadingBar
          color='#f11946'
          height={3}
          progress={this.state.progress}
          onLoaderFinished={() => this.setProgress(0)}
        />
        <div className='container my-3'>
          <h1 className='text-center'>Top Headlines</h1>

          <div className='text-center'>
            {this.state.loading && <Spinner />}
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length < this.state.totalResults} // Replace with a condition based on your data source
              loader={<Spinner />}
              endMessage={<p>No more data to load.</p>}
            >
              <div className='row'>
                {this.state.articles.map((element) => {
                  return (
                    <NewsItem
                      key={element.url}
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

        {/* <div className='container d-flex justify-content-between'>
          <button
            type='button'
            className='btn btn-sm btn-dark'
            onClick={this.HandlePreviousClick}
            disabled={this.state.page <= 1}
          >
            &larr;Previous
          </button>
          <button
            type='button'
            className='btn btn-sm btn-dark'
            onClick={this.HandleNextClick}
            disabled={
              Math.ceil(this.state.totalResults / this.props.pageSize) <
              this.state.page + 1
            }
          >
            Next&rarr;
          </button>
        </div> */}
      </>
    );
  }
}
