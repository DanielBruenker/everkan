/**
 *
 * @param column
 */
const updateColumn = (column: any) => {
  let response = null;
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(column)
  };
  fetch('http://localhost:8080/api/v1/board/1/column', requestOptions)
    .then(response => response.json())
    .then(data => response = data);

  return response;
};

/**
 *
 * @param columns
 */
const updateColumns = (columns: any[]) => {
  let response = null;
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(columns)
  };
  fetch('http://localhost:8080/api/v1/board/1/columns', requestOptions)
    .then(response => response.json())
    .then(data => response = data);

  return response;
};

/**
 *
 * @param boardID
 * @param title
 */
const addNewColumn = (boardID: number, title: string) => {
  let response = null;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title })
  };
  fetch('http://localhost:8080/api/v1/board/' + boardID + '/column', requestOptions)
    .then(response => response.json())
    .then(data => response = data);

  return response;
};


const api = {
  'kanbanBoard': {
    'addNewColumn': addNewColumn
  },
  'kanbanColumn': {
    'updateColumn': updateColumn,
    'updateColumns': updateColumns
  }
};

export default api;


