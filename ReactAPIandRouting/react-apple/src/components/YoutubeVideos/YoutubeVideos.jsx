import React, { useEffect, useState } from "react";
import "./YoutubeVideos.css";


const YoutubeVideos = () => {
  const [appleVideos, setAppleVideos] = useState([]);
  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchvideos = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=8&order=date&key=${api_key}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // Check if data.items exists before setting state
        if (data.items) {
          setAppleVideos(data.items);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchvideos();
  }, [api_key]); // Added api_key as dependency

  return (
    <div className="youtube-section">
      <h2 className="text-center my-4">Latest YouTube Videos</h2>
      <div className="container">
        <div className="row">
          {/* Changed 'videos.map' to 'appleVideos.map' */}
          {appleVideos?.map((video) => (
            <div key={video.id.videoId} className="col-md-4 video-card mb-4">
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="img-fluid rounded"
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                />
              </a>
              <h3 className="h5 mt-2">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark"
                >
                  {video.snippet.title}
                </a>
              </h3>
              <p className="small text-muted">
                {video.snippet.description?.substring(0, 100) ||
                  "No description available"}
                ...
              </p>
              <p className="publish-date font-italic">
                Published: {new Date(video.snippet.publishedAt).toDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideos;
