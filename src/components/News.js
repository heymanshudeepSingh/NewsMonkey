import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
export default class News extends Component {
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&page=${this.state.page}&apiKey=fd7fc2daecba428fb5009ffe1cf164a9&page=1&pagesize=${this.props.pageSize}`;
    let data = await fetch(apiUrl);
    let dataJson = await data.json();
    this.setState({
      articles: dataJson.articles,
      totalResults: dataJson.totalResults,
      loading: false,
    });
  }
  async updateState() {
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fd7fc2daecba428fb5009ffe1cf164a9&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(apiUrl);
    let dataJson = await data.json();
    this.setState({
      articles: dataJson.articles,
      totalResults: dataJson.totalResults,
      loading: false,
    });
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
  
  };

  render() {
    return (
      <>
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
