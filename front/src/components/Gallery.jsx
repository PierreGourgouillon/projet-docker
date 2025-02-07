import ImageCard from "./ImageCard";
import { useEffect, useState } from "react";
import API from "../api/axios.jsx";
import { isAccessTokenExpired } from "../api/refreshToken.jsx";

function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGallery = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("JWT");
        const response = await API.get("/galleries/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGalleries(response.data.data);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
      setIsLoading(false);
    };
    loadGallery();
  }, []);
  return (
    <div className="container mx-auto">
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div>Loading</div>
        ) : galleries && galleries.length > 0 ? (
          galleries.map((image) => <ImageCard key={image._id} image={image} />)
        ) : (
          <div>No images available</div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
