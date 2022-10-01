import { Context, Callback } from "aws-lambda";
import { booktokiHandler } from ".";
(
    async () => {
        const event = {
            novel_id: 1664667,
            detail: false,
        }
        const res = await booktokiHandler(event, {} as Context);
        if (res instanceof Error) {
            console.error(res.message);
        } else {
            console.log(JSON.stringify(res))
        }
    }
)();