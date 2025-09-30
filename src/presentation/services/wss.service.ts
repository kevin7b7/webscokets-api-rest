import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws'


interface Options{
    server: Server;
    path?: string
}

export class WssService{

    private static _instace: WssService;
    private wss: WebSocketServer;


    private constructor(options: Options){

        const { server, path ='/ws'} = options;

        this.wss = new WebSocketServer({ server, path });
        this.start();

    }


    static initWss( options: Options ){

        WssService._instace =  new WssService( options );

    }

    static get instance(): WssService{

        if( !WssService._instace )
            throw 'WssServices is no initialized';


        return WssService._instace;
    }


    public start(){

        this.wss.on('connection', ( ws: WebSocket ) => {

            console.log('Client connected');

            ws.on('close', () => console.log(' client disconnected '));


        });
    }




}