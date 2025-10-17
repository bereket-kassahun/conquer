import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? '' : 'https://conquer-backend.onrender.com';

export const socket = io(URL);
