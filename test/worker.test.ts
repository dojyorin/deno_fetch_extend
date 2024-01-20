import {assertEquals} from "../deps.test.ts";
import {createTask} from "../src/worker.ts";

const sample1 = new Uint8Array([1, 2, 3, 4]);
const sample2 = new Uint8Array([1, 4, 6, 8]);

Deno.test({
    name: "Worker: Create Task.",
    async fn(){
        const task = createTask<Uint8Array, Uint8Array>((v)=>{
            const result = v.map(n => n * 2);

            return {
                message: result,
                transfer: [result]
            };
        });

        const result = await task(sample1, [sample1]);

        assertEquals(result, sample2);
    }
});