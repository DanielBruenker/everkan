import { authHeader } from '../helpers';
import { config }  from '../../config';

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
  return fetch(config.BASE_URL + '/board/' + board.id, requestOptions)
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
  return fetch(config.BASE_URL + '/board/' + 1, requestOptions)
    .then(response => response.json())
    .then(board => {
      return board;
    });
}