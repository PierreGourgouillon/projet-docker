import ImageCard from './ImageCard';

const dummyImages = [
  { id: 1, src: 'https://via.placeholder.com/300', title: 'Image 1' },
  { id: 2, src: 'https://via.placeholder.com/300', title: 'Image 2' },
  { id: 3, src: 'https://via.placeholder.com/300', title: 'Image 3' },
  { id: 4, src: 'https://via.placeholder.com/300', title: 'Image 4' },
];

function Gallery() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyImages.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
