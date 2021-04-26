import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import KanbanBoard from './Components/KanbanBoard';


const App = () => {

  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/projects`,
      {
        method: 'GET'
      }
    )
      .then(res => res.json())
      .then(response => {
        setProject(response[0]);
      })
      .catch(error => console.log(error));
  }, []);


  const renderBoard = () => {
    // @ts-ignore
    return ((project) ? <KanbanBoard boardID={1}/> : null);
  };

  return (
    renderBoard()
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
