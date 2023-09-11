import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
export default class News extends Component {
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fd7fc2daecba428fb5009ffe1cf164a9&page=1&pagesize=${this.props.pageSize}`;
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

  render() {
    return (
      <>
        <div className='container my-3'>
          <h1 className='text-center'>Top Headlines</h1>

          <div className='text-center'>{this.state.loading && <Spinner />}</div>
          <div className='row'>
            {this.state.articles.map((element) => {
              return (
                !this.state.loading && (
                  <NewsItem
                    key={element.url}
                    title={element.title}
                    description={element.description}
                    imgurl={element.urlToImage}
                    newsUrl={element.url}
                    publishedAt={element.publishedAt}
                    author={element.author}
                  />
                )
              );
            })}
          </div>
        </div>

        <div className='container d-flex justify-content-between'>
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
        </div>
      </>
    );
  }
}
