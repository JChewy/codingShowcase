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
		<ul className="col-md-6 list-group">
			{videoItems}
		</ul>
	)
}

export default VideoList; 