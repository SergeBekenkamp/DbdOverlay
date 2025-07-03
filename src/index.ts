import { WebSocketServer } from 'ws';
import { KeyboardListener } from "io-listener";
import {GameState} from "./GameState.ts";
import  express from 'express'

const state = new GameState();

const wss = new WebSocketServer({
    port: 8080,
    perMessageDeflate: false,
});

wss.on('connection', (ws) => {
    ws.send(JSON.stringify(state.getHookState()));
})

state.addListener((event) => {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(event));
    })
})

const listener = new KeyboardListener()
await listener.listen()


const app = express()
const port = 3000

app.use(express.static('public'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


listener.on('keyDown', (event) => {
    switch(event.key) {
        case '1':
            state.incrementHook(1);
            break;
        case '2':
            state.incrementHook(2);
            break;
        case '3':
            state.incrementHook(3);
            break;
        case '4':
            state.incrementHook(4);
            break;
        case '0':
            state.resetHookStates();
            break;
        default:
            break;
    }
    console.log(state.getHookState(), event)
})

