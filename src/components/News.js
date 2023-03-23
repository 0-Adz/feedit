import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.props.category} - FeedIt`;
    
  }
  async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79b053287e5e4f558eb2f9d6787b50df&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({articles : parsedData.articles, totalResults: parsedData.totalResults, loading: false})
  }
  async componentDidMount(){
    this.updateNews();
   
  } 
  // handlePrevclick=async()=>{
  //   this.setState({page: this.state.page - 1});
  //   this.updateNews();
    
  // }
  // handleNextclick=async()=>{
  //   this.setState({page: this.state.page + 1});
  //   this.updateNews();
  // }
  fetchMoreData = async() => {
    await this.setState({page: this.state.page + 1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79b053287e5e4f558eb2f9d6787b50df&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({articles : this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
  };
  

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px'}}>FeedIt - Top Headlines on {this.props.category} </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner/>}>
        <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {

          return <div className="col-md-4 my-3" key={element.url} >
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* --------  For creating previous and next button with disabling function when no more content is available ---------*/}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2" onClick={this.handlePrevclick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark " onClick={this.handleNextclick}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
}

export default News;
