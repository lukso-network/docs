import React from 'react';
import styles from './IconsGallery.module.scss';

type IconsGalleryProps = {
  items: {
    name: string;
    image: string;
    url: string;
    backgroundColor: string;
  }[];
};

const IconsGallery: React.FC<IconsGalleryProps> = ({ items }) => {
  return (
    <div className={styles.dappsContainer}>
      {items.map(
        ({
          name,
          image,
          url,
          backgroundColor: bgColor, // renaming destructured property for code clarity (avoid confusion with `style={{ backgroundColor: '...' }}`)
        }) => (
          <div
            key={name}
            style={{ backgroundColor: bgColor }}
            className={styles.dappCard}
          >
            <a href={url} target="_blank" rel="noreferer noopener">
              <img src={image} className={styles.dappCardImage} />
            </a>
          </div>
        ),
      )}
    </div>
  );
};

export default IconsGallery;
