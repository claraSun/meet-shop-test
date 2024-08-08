import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import Slider from 'react-slick';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editWidth, setEditWidth] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editImages, setEditImages] = useState('');

  const [, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item) => addComponent(item.type),
  }));

  const addComponent = useCallback((type) => {
    const newComponent = {
      id: Date.now(),
      type,
      content: type === 'text' ? '<p>新文字內容</p>' : '',
      width: 300,
      height: 200,
      url: 'https://via.placeholder.com/150',
      images: type === 'carousel' ? ['https://via.placeholder.com/300x200', 'https://via.placeholder.com/300x200'] : [],
    };
    setComponents((prev) => [...prev, newComponent]);
  }, []);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
    if (component.type === 'image') {
      setEditWidth(component.width);
      setEditHeight(component.height);
      setEditUrl(component.url);
    } else if (component.type === 'text') {
      setEditContent(component.content);
    } else if (component.type === 'carousel') {
      setEditImages(component.images.join(','));
      setEditWidth(component.width);
      setEditHeight(component.height);
    }
  };

  const handleSave = () => {
    if (selectedComponent.type === 'image') {
      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === selectedComponent.id ? { ...comp, width: editWidth, height: editHeight, url: editUrl } : comp
        )
      );
    } else if (selectedComponent.type === 'text') {
      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === selectedComponent.id ? { ...comp, content: editContent } : comp
        )
      );
    } else if (selectedComponent.type === 'carousel') {
      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === selectedComponent.id ? { ...comp, images: editImages.split(',').map(url => url.trim()), width: editWidth, height: editHeight } : comp
        )
      );
    }
    setSelectedComponent(null);
  };

  const handleTextChange = (content) => {
    setEditContent(content);
  };

  const handleWidthChange = (e) => {
    setEditWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setEditHeight(e.target.value);
  };

  const handleUrlChange = (e) => {
    setEditUrl(e.target.value);
  };

  const handleImagesChange = (e) => {
    setEditImages(e.target.value);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="main-editor" ref={drop}>
      {components.map((component) => (
        <div
          key={component.id}
          className="component"
          onClick={() => handleComponentClick(component)}
          style={{ cursor: 'pointer', width: component.width, height: component.height }}
        >
          {component.type === 'image' ? (
            <img src={component.url} alt="" width={component.width} height={component.height} />
          ) : component.type === 'text' ? (
            <div dangerouslySetInnerHTML={{ __html: component.content }} />
          ) : component.type === 'carousel' ? (
            <div style={{ width: component.width, height: component.height }}>
              <Slider {...sliderSettings}>
                {component.images.map((url, index) => (
                  <div key={index}>
                    <img src={url} alt="" style={{ width: '100%', height: 'auto' }} />
                  </div>
                ))}
              </Slider>
            </div>
          ) : null}
        </div>
      ))}
      {selectedComponent && (
        <div className="editor-panel">
          {selectedComponent.type === 'image' ? (
            <>
              <label>
                寬度:
                <input
                  type="number"
                  value={editWidth}
                  onChange={handleWidthChange}
                />
              </label>
              <label>
                高度:
                <input
                  type="number"
                  value={editHeight}
                  onChange={handleHeightChange}
                />
              </label>
              <label>
                圖片 URL:
                <input
                  type="text"
                  value={editUrl}
                  onChange={handleUrlChange}
                />
              </label>
            </>
          ) : selectedComponent.type === 'text' ? (
            <>
              <ReactQuill value={editContent} onChange={handleTextChange} />
            </>
          ) : selectedComponent.type === 'carousel' ? (
            <>
              <label>
                圖片 URLs (用逗號分隔):
                <input
                  type="text"
                  value={editImages}
                  onChange={handleImagesChange}
                />
              </label>
              <label>
                寬度:
                <input
                  type="number"
                  value={editWidth}
                  onChange={handleWidthChange}
                />
              </label>
              <label>
                高度:
                <input
                  type="number"
                  value={editHeight}
                  onChange={handleHeightChange}
                />
              </label>
            </>
          ) : null}
          <button onClick={handleSave}>保存</button>
        </div>
      )}
    </div>
  );
};

export default Editor;
