
import { App as ExpressApp, simpleLog, bodyParser } from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";


class App {
    public static app: ExpressApp;

    public static async init(): Promise<void> {
        this.app = new ExpressApp();
        this.app.use(simpleLog());
        this.app.use(bodyParser.json());

        this.app.get("/", async (req, res) => {
            await res.json([{ name: "O, hi" }]);
        });

        this.app.get("/api/todos", async (req, res) => {
            await res.json([{ name: "Buy some milk" }]);
        });

        await this.app.listen(1337);
        console.log("server starting on :1337....");
    }
}

await App.init();