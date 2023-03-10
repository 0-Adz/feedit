import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl, newsUrl} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"http://cdn.wionews.com/sites/default/files/2023/02/17/333056-untitled-design-2023-02-17t151731065.png":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
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
