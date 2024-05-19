// src/components/Module.js
import React, { useState } from 'react';
import Resource from './Resource';
import AddResource from './AddResource';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDrop } from 'react-dnd';

const Module = ({ module, index, moveModule, renameModule, deleteModule, addResource, moveResource, renameResource, deleteResource }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [moduleName, setModuleName] = useState(module.name);

  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: 'MODULE',
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
      moveModule(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drop(ref);

  const handleRename = () => {
    setIsEditing(false);
    renameModule(module.id, moduleName);
  };

  return (
    <div ref={ref} className="module">
      {isEditing ? (
        <input
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          onBlur={handleRename}
        />
      ) : (
        <h2>
          {module.name}
          <FaEdit onClick={() => setIsEditing(true)} />
          <FaTrash onClick={() => deleteModule(module.id)} />
        </h2>
      )}
      <AddResource onAdd={(name, type) => addResource(module.id, name, type)} />
      {module.resources.map((resource, idx) => (
        <Resource
          key={resource.id}
          index={idx}
          resource={resource}
          moduleId={module.id}
          moveResource={moveResource}
          onDelete={deleteResource}
          onRename={renameResource}
        />
      ))}
    </div>
  );
};

export default Module;
