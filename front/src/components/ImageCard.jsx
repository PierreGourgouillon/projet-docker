import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from "../api/axios.jsx";

function ImageCard({ image }) {
  const [likes, setLikes] = useState(image.likes.length);

  const handleLike = async () => {
    try {
      const response = await API.post(`/galleries/${image._id}/like`)

      if (response.data.isLike !== null) {
        setLikes(likes+1)
      }
    } catch {
    }
  }

  const handleUnlike = async () => {
    try {
      const response = await API.post(`/galleries/${image._id}/unlike`)

      if (response.data.isUnlike !== null) {
        setLikes(likes-1)
      }
    } catch {
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image.image}
        alt={image.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{image.title}</h2>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleLike}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Like
          </button>
          <button
            onClick={handleUnlike}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Dislike
          </button>
          <span className="text-gray-700 font-bold">{likes} Likes</span>
        </div>
      </div>
    </div>
  );
}

ImageCard.propTypes = {
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };

export default ImageCard;
