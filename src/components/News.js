import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  
  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    
  }
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=79b053287e5e4f558eb2f9d6787b50df&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({articles : parsedData.articles, totalResults: parsedData.totalResults})
  } 
  handlePrevclick=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=79b053287e5e4f558eb2f9d6787b50df&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles : parsedData.articles
    })
    
  }
  handleNextclick=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=79b053287e5e4f558eb2f9d6787b50df&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles : parsedData.articles
    })
  }
  

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-3">FeedIt - Top Headlines </h1>
        <div className="row">
          {this.state.articles.map((element) => {

          return <div className="col-md-4 my-3" key={element.url} >
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} />
          </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2" onClick={this.handlePrevclick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark " onClick={this.handleNextclick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
