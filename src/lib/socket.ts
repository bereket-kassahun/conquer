import { io } from 'socket.io-client';

const URL = 'https://conquer-backend.onrender.com';

export const socket = io(URL);
