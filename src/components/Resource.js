// src/components/Resource.js
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Resource = ({ resource, index, moveResource, moduleId, onDelete, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [resourceName, setResourceName] = useState(resource.name);

  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: 'RESOURCE',
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveResource(dragIndex, hoverIndex, moduleId);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'RESOURCE',
    item: { type: 'RESOURCE', id: resource.id, index, moduleId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleRename = () => {
    setIsEditing(false);
    onRename(resource.id, resourceName);
  };

  return (
    <div ref={ref} className="resource" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {isEditing ? (
        <input
          type="text"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          onBlur={handleRename}
        />
      ) : (
        <div>
          {resource.name}
          <FaEdit onClick={() => setIsEditing(true)} />
          <FaTrash onClick={() => onDelete(resource.id)} />
        </div>
      )}
    </div>
  );
};

export default Resource;
