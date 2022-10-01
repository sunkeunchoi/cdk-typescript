import { Context } from "aws-lambda";
import { booktokiHandler } from ".";
(
    async () => {
        const event = {
            novel_id: 1668195,
            detail: true,
        }
        const res = await booktokiHandler(event, {} as Context);
        if (res instanceof Error) {
            console.error(res.message);
        } else {
            console.log(JSON.stringify(res))
        }
    }
)();