/* eslint-disable import/no-anonymous-default-export */
import { Server as ServerIO } from "socket.io";
import { BASE_URL } from "../../lib/constants";

export const config = {
    api: {
        bodyParser: false
    }
};

export default async (req, res) => {
    if (!res.socket.server.io) {
        console.log("New Socket.io server...");
        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, {
            path: "/api/socketio",
            cors: {
                origin: BASE_URL,
            }
        });
        res.socket.server.io = io;
    }
    res.end();
}


