import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'; 
import $ from 'jquery'; 
// import ChessBoard from 'chessboardjs';
import YTSearch from 'youtube-api-search'; 
import SearchBar from './components/searchbar'; 
import VideoList from './components/video_list'; 
import VideoDetail from './components/video_detail';
import Board from './components/chess_board'; 
const API_KEY = 'AIzaSyA_1qpu2HrKoCjCTjIV3oVsmsfy_iZnUu4';




class App extends Component {
	constructor(props){
		super(props); 

		this.state = { 
						videos:[], 
						selectedVideo: null, 
					}; 

		this.videoSearch('kingscrusher'); 
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			if(!videos[0]){
				this.setState({
					videos:null, 
					notFound:true
				});
			} else {
				this.setState({ 
					videos: videos, 
					selectedVideo: videos[0], 
					notFound: false
				}); 
			}
		}); 
	}



	render(){
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500); 


		return(
			<div>
				<h3 id="search-header"> Search for your game! </h3>
				<SearchBar onSearchTermChange={term => this.videoSearch("chess game" + term)} />
				<div className="col-md-12 chess-container">
					<VideoDetail video={this.state.selectedVideo} />
					<Board id="chess-board" />
				</div>
				<h3 id="list-header"> Video List </h3>
				<VideoList 
					videos={this.state.videos} 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}/>
			</div>
		); 
	}
}

$(document).ready(function(){
	ReactDOM.render(<App />, document.querySelector('.container'));
});
