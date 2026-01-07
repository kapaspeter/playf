import React, { useState } from 'react';
import styles from './PhotoGallery.module.css';

const images = [
  { id: 1, url: 'https://placehold.co/600x400/orange/white?text=Playground+1', alt: 'Playground Area 1' },
  { id: 2, url: 'https://placehold.co/600x400/blue/white?text=Playground+2', alt: 'Playground Area 2' },
  { id: 3, url: 'https://placehold.co/400x600/green/white?text=Playground+3', alt: 'Playground Area 3' },
  { id: 4, url: 'https://placehold.co/600x400/red/white?text=Playground+4', alt: 'Playground Area 4' },
  { id: 5, url: 'https://placehold.co/600x400/purple/white?text=Playground+5', alt: 'Playground Area 5' },
  { id: 6, url: 'https://placehold.co/800x600/yellow/black?text=Playground+6', alt: 'Playground Area 6' },
];

const PhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.grid}>
        {images.map((image) => (
          <div 
            key={image.id} 
            className={styles.imageWrapper}
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.url} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <div className={styles.lightboxContent}>
            <img src={selectedImage.url} alt={selectedImage.alt} />
            <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
