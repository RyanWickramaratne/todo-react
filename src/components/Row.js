import React from 'react';

function Row({ item, deleteTask }) {
  return (
    <li>
      {item.description}
      <button onClick={() => deleteTask(item.id)}>Delete</button>
    </li>
  );
}

export default Row;
