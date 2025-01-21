import { useState } from 'react';
import PropTypes from 'prop-types';

function ImageCard({ image }) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleDislike = () => setLikes((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image.src}
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
            onClick={handleDislike}
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
