import React from 'react';
import { useDrag } from 'react-dnd';

const Sidebar = () => {
  const [, dragImage] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type: 'image' },
  }));

  const [, dragText] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type: 'text' },
  }));

  const [, dragCarousel] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type: 'carousel' },
  }));

  return (
    <div className="sidebar">
      <div ref={dragImage} className="drag-item">圖片元件</div>
      <div ref={dragText} className="drag-item">文字元件</div>
      <div ref={dragCarousel} className="drag-item">輪播元件</div>
    </div>
  );
};

export default Sidebar;
