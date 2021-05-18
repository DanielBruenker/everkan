import axios from "axios";
import { config } from "../../config";
import { login } from "./authenticationApi";
import { getBoardByID, moveCard, moveColumn, updateCard } from './kanbanBoardApi';

export const api = axios.create({
  baseURL: config.baseURL,
});

export const everkanApi = {
  authentication: {
    login,
  },
  kanbanBoard: {
    moveCard,
    moveColumn,
    getBoardByID,
    updateCard
  },
};
