// src/components/CourseBuilder.js
import React, { useState } from 'react';
import AddModule from './AddModule';
import Module from './Module';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);

  const addModule = (name) => {
    setModules([...modules, { id: Date.now(), name, resources: [] }]);
  };

  const renameModule = (moduleId, newName) => {
    setModules(modules.map(module => module.id === moduleId ? { ...module, name: newName } : module));
  };

  const deleteModule = (moduleId) => {
    setModules(modules.filter(module => module.id !== moduleId));
  };

  const addResource = (moduleId, file, fileName) => {
    setModules(modules.map(module => module.id === moduleId ? {
      ...module,
      resources: [...module.resources, { id: Date.now(), file, name: fileName }]
    } : module));
  };

  const renameResource = (moduleId, resourceId, newName) => {
    setModules(modules.map(module => module.id === moduleId ? {
      ...module,
      resources: module.resources.map(resource => resource.id === resourceId ? { ...resource, name: newName } : resource)
    } : module));
  };

  const deleteResource = (moduleId, resourceId) => {
    setModules(modules.map(module => module.id === moduleId ? {
      ...module,
      resources: module.resources.filter(resource => resource.id !== resourceId)
    } : module));
  };

  const moveModule = (fromIndex, toIndex) => {
    const newModules = [...modules];
    const [movedModule] = newModules.splice(fromIndex, 1);
    newModules.splice(toIndex, 0, movedModule);
    setModules(newModules);
  };

  const moveResource = (fromIndex, toIndex, moduleId) => {
    setModules(modules.map(module => module.id === moduleId ? {
      ...module,
      resources: (() => {
        const newResources = [...module.resources];
        const [movedResource] = newResources.splice(fromIndex, 1);
        newResources.splice(toIndex, 0, movedResource);
        return newResources;
      })()
    } : module));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="course-builder">
        <h1>Course Builder</h1>
        <AddModule onAdd={addModule} />
        {modules.map((module, index) => (
          <Module
            key={module.id}
            index={index}
            module={module}
            moveModule={moveModule}
            renameModule={renameModule}
            deleteModule={deleteModule}
            addResource={addResource}
            moveResource={moveResource}
            renameResource={renameResource}
            deleteResource={deleteResource}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default CourseBuilder;
