import React from 'react'; 
import VideoListItem from './video_list_item'; 


const VideoList = ({videos, onVideoSelect}) => {

	if(!videos){
		return(
			<h2 className="notFound">maybe try a different search term?</h2>
		)
	}

	const videoItems = videos.map((video) => {
		return <VideoListItem 
					onVideoSelect = {onVideoSelect}
					key={video.etag} 
					video={video} />
	})

	return(
		<div>
			<h3 id="list-header"> Video List </h3> 
			<ul className="col-md-4 list-group">
				{videoItems}
			</ul>
		</div>
	)
}

export default VideoList; 