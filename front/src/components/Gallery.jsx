import ImageCard from './ImageCard';
import {useEffect, useState} from "react";
import API from "../api/axios.jsx";

function Gallery() {
    const [isLoading, setIsLoading] = useState(false)
    const [galleries, setGalleries] = useState([])

    useEffect(async () => {
        setIsLoading(true)
        try {
            const response = await API.get('/galleries/');
            setGalleries(response.data.data)
            console.log(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
        setIsLoading(false)
    }, [])
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
              ?
              <div>Loading</div>
              :
                galleries.map((image) => (
                    <ImageCard key={image._id} image={image} />
                ))
          }
      </div>
    </div>
  );
}

export default Gallery;
