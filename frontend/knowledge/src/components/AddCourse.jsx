import React, { useState } from 'react';
import './AddCourse.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddCourse = () => {
    const [numLectures, setNumLectures] = useState(1);
    const [title, setTitle] = useState('');
    const [lectureData, setLectureData] = useState([]);
    const [imgUrl, setImgUrl] = useState('');
    const [type, setType] = useState('');

    const navigate = useNavigate();

    const handleNumLecturesChange = (event) => {
        const newValue = parseInt(event.target.value);
        setNumLectures(newValue);
        setLectureData([]);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleImgUrlChange = (event) => {
        setImgUrl(event.target.value);
    };


    const handleLectureChange = (index, field, value) => {
        const newData = [...lectureData];
        newData[index] = { ...newData[index], [field]: value };
        setLectureData(newData);
    };

    const handleTypeChange = (event) =>{
        setType(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            title: title,
            imgUrl: imgUrl,
            type: type,
            links: lectureData.map(lecture => ({ name: lecture.lectureTitle, link: lecture.vidlink }))
        };

        try {
            const response = await axios.post('http://localhost:5000/api/course/add', formData).then(alert("Course Added Successfully!")).then(navigate("/"));
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="addcourse-container">
            <form onSubmit={handleSubmit}>
                <div className="title">
                    <h3>Title:</h3>
                    <input
                        type="text"
                        name='title'
                        placeholder='Enter Title Name'
                        value={title}
                        onChange={handleTitleChange} // Call handleTitleChange on input change
                    />
                </div>
                <div className="img-url">
                            <h4>Image URL:</h4>
                            <input
                                type="text"
                                name='imgUrl'
                                placeholder='Enter Image URL'
                                value={imgUrl}
                                onChange={handleImgUrlChange}
                            />
                        </div>
                        <div className="type">
                        <h4>Type:</h4>
                            <input type="text" name="type" placeholder='Enter Course Type' value={type} onChange={handleTypeChange} />
                        </div>
                <div className="counter">
                    <h4>Number of Lectures:</h4>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="20"
                        value={numLectures}
                        onChange={handleNumLecturesChange}
                    />
                </div>
                {Array.from({ length: numLectures }).map((_, index) => (
                    <div className="lecture" key={index}>
                        <div className="lecture-title">
                            <h4>Lecture Title:</h4>
                            <input
                                type="text"
                                name={`lectureTitle${index}`}
                                placeholder='Enter Lecture Title'
                                onChange={(e) => handleLectureChange(index, 'lectureTitle', e.target.value)} // Call handleLectureChange on input change
                            />
                        </div>
                        <div className="vid-link">
                            <h4>Video Link:</h4>
                            <input
                                type="text"
                                name={`vidlink${index}`}
                                placeholder='Enter Video Link'
                                onChange={(e) => handleLectureChange(index, 'vidlink', e.target.value)} // Call handleLectureChange on input change
                            />
                        </div>
                    </div>
                ))}
                <button type="submit">Add Course</button>
            </form>
        </div>
    )
}

export default AddCourse;

