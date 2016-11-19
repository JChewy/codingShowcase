import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'; 
import YTSearch from 'youtube-api-search'; 
import SearchBar from './components/searchbar'; 
import VideoList from './components/video_list'; 
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyA_1qpu2HrKoCjCTjIV3oVsmsfy_iZnUu4';




class App extends Component {
	constructor(props){
		super(props); 

		this.state = { 
						videos:[], 
						selectedVideo: null, 
					}; 

		this.videoSearch('chess'); 
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos, 
				selectedVideo: videos[0]
			}); 
		}); 
	}


	render(){
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500); 


		return(
			<div>
				<SearchBar onSearchTermChange={term => this.videoSearch(term)} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					videos={this.state.videos} 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}/>
			</div>
		); 
	}
}


ReactDOM.render(<App />, document.querySelector('.container'));