import { authHeader } from '../helpers';

export const boardService = {
  update,
  getBoard
};

function update(board){
  const header = authHeader();
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json', ...header},
    body: JSON.stringify(board)
  };
  return fetch('http://localhost:8080/api/v1/board/' + board.id, requestOptions)
    .then(response => response.json())
    .then(data => {
      return {
        ...board,
        columns: data
      };
    });
}

function getBoard(){
  const header = authHeader();
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...header},
  };
  return fetch('http://localhost:8080/api/v1/board/' + 1, requestOptions)
    .then(response => response.json())
    .then(board => {
      return board;
    });
}