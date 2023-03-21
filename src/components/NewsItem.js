import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-info" style={{left: '80%', zIndex:'1', color: 'white'}}>{source}</span>
          <img src={!imageUrl?"http://cdn.wionews.com/sites/default/files/2023/02/17/333056-untitled-design-2023-02-17t151731065.png":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">
              By {author? author:"Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-danger">
              Read more 
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
