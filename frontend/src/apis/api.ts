import axios from 'axios';
import { config } from '../../config';
import { authHeader } from '../utils/auth-header';
import { KanbanBoard } from '../entities/KanbanBoard';

const api = axios.create({
  baseURL: config.baseURL,
});

export const everkanApi = {
  auth: {
    login,
  },
  board: {
    updateBoard,
    getBoardByID
  }
};

async function updateBoard(board: KanbanBoard){
  const url = '/board/' + board.id;
  const config = {
    headers: {
       'Content-Type': 'application/json',
      ...authHeader()
    }
  };
  const data = JSON.stringify(board);

  return await api.put(url, data, config);
}

async function getBoardByID(boardID: number){
  const url = '/board/' + boardID;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
  };

  return await api.get(url, config);
}

async function login(email: string, password: string){
    const url = '/auth/signin';
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        ...authHeader()
      },
    };
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    return await api.post(url, formData, config)
}

