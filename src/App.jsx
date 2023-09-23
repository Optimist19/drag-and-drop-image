import { useState } from "react";
import SortableList, { SortableItem } from 'react-easy-sort'
import { arrayMoveImmutable } from 'array-move';

function App() {
  const [images, setImages] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const newImages = [...images];
    for (const file of e.dataTransfer.files) {
      const imageUrl = URL.createObjectURL(file);
      newImages.push(imageUrl);
    }

    setImages(newImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const onSortEnd = (oldIndex, newIndex) => {
    setImages((array) => arrayMoveImmutable(array, oldIndex, newIndex))
  }

  return (
    <div className="container">
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        <p>Drag and drop images here</p>
      </div>
      <div className="image-container">
        <SortableList onSortEnd={onSortEnd} draggedItemClassName="dragged">

            {images.map((image) => (
              <SortableItem key={image}>
                <img
                  key={image}
                  src={image}
                  alt={`Image ${image}`}
                  className="image-preview"
                />
              </SortableItem>
            ))}
        </SortableList>
      </div>

    </div>
  );
}

export default App;
