
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

class App {
    public static server: Deno.Listener;

    private static requestHandler(req: Deno.RequestEvent): void {
        req.respondWith(new Response(v4.generate(), {
            status: 200
        }))
    }

    public static async init(): Promise<void> {
        this.server = Deno.listen({port: 1337});
        console.log("server starting on :1337....");

        for await (const conn of this.server) {
            (async () => {
                const httpConn = Deno.serveHttp(conn);
                for await (const requestEvent of httpConn) {
                    this.requestHandler(requestEvent);
                }
            })();
        }
    }
}

await App.init();