import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, imgurl, newsUrl } = this.props;
    return (
      <>
        <div className='col-md-4'>
          <div className='card' style={{ width: '18rem'}}>
            <img
              src={
                imgurl
                  ? imgurl
                  : 'https://ichef.bbci.co.uk/news/1024/branded_news/0E83/production/_115651730_breaking-promo-976.png'
              }
              alt='...'
            />
            <div className='card-body'>
              <h5 className='card-title'>
                {title ? title.slice(0, 45) : ''}...
              </h5>
              <p className='card-text'>
                {description ? description.slice(0, 88) : ''}...
              </p>
              <a
                href={newsUrl}
                rel='noreferrer'
                target='_blank'
                className='btn btn-sm btn-dark'
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
