import { io } from 'socket.io-client';

const SERVER = 'http://localhost:3000';

export default class SocketService {
    static instance;

    constructor() {
        this.socket = io(SERVER);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new SocketService();
        }
        return this.instance;
    }

    addEventListener(eventName, callback) {
        this.socket.on(eventName, callback);
    }

    removeEventListener(eventName, callback) {
        this.socket.off(eventName, callback);
    }
}