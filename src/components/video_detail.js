import React from 'react'; 

const VideoDetail = ({video, notFound}) => {

	if(!video){
		return <div> loading... </div>
	} 

	const videoId = video.id.videoId; 
	const url = `https://www.youtube.com/embed/${videoId}`; 


	return(
		<div className="video-detail col-md-6">
			<div className="embed-responsive embed-responsive-16by9">
				<iframe className="embed-responsive-item" src={url}></iframe>
			</div>
			<div className="details">
				<div>{video.snippet.title}</div>
				<div>{video.snippet.description}</div>
			</div>
		</div>

	)
}; 

export default VideoDetail; 