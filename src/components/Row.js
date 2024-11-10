import React from 'react';

// Task data will be rendered here as a list. (This component is being called in Home.js component)
function Row({ item, deleteTask }) {
  return (
    <li>
      {item.description}
      <button onClick={() => deleteTask(item.id)}>Delete</button>
    </li>
  );
}

export default Row;
