import React from 'react';
import SocketIOClient from "socket.io-client";
import { BASE_URL } from '../lib/constants';


export const socket = SocketIOClient.connect(BASE_URL, {
    path: "/api/socketio"
});

export const SocketContext = React.createContext();