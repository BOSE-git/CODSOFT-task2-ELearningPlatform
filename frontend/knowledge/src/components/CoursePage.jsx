import './CoursePage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoursePage = () => {
    const [courseData, setCourseData] = useState();
    const [chain, setChain] = useState();
    const [completedVideos, setCompletedVideos] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/api/temporaryData")
            .then(response => {
                setCourseData(response.data);
                if (response.data.links.length > 0) {
                    setChain(response.data.links[0].link);
                }
            })
            .catch(error => {
                console.error('Error fetching data from backend', error);
            });
    }, []);

    const handleClick = (videoUrl, index) => {
        if (index === completedVideos) {
            setChain(videoUrl);
            setCompletedVideos(completedVideos + 1);
        } else {
            setCompletedVideos(index);
            setChain(videoUrl);
        }
    }

    const totalVideos = courseData?.links.length || 1;
    const progress = (completedVideos / totalVideos) * 100;

    return (
        <div className="course-container">
            {courseData ? (
                <div className="video--links">
                    <div className="video-area">
                        <iframe src={chain} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className="link-area">
                        <div className="links-container">
                            <h3>Lectures</h3>
                            <ul>
                                {courseData.links.map((link, index) => (
                                    <li key={index} onClick={() => handleClick(link.link, index)}>
                                        {link.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ height: `${progress}%` }}></div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>


    )
}

export default CoursePage;
