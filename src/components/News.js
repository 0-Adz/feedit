import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)
  const updateNews = async () =>{
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(45);
    let parsedData= await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${props.category} - FeedIt`;
    updateNews();
    // eslint-disable-next-line
  },[])
  
  //const handlePrevclick=async()=>{
  //   setPage(page-1);
  //   updateNews();
  // }

  //const handleNextclick=async()=>{
  //   setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData = async() => {
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>FeedIt - Top Headlines on {props.category} </h1>
        {loading && <Spinner/>}
        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spinner/>}>
        <div className="container">
        <div className="row">
          {articles.map((element) => {

          return <div className="col-md-4 my-3" key={element.url} >
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* --------  For creating previous and next button with disabling function when no more content is available ---------*/}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark mx-2" onClick={handlePrevclick}>&larr; Previous</button>
        <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark " onClick={handleNextclick}>Next &rarr;</button>
        </div> */}
      </>
    );
  }

News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;
