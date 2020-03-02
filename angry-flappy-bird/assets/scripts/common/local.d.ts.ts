declare namespace _local {
    export namespace user_info {
        export let heartbeat: number;
        export let shield: number;
        export let bullet: number;
        export let multiple_bullet: number;
        export let bomb: number;
    }

    export namespace stage_info {
        export let type;
        export let id;
        export let bird1;
        export let bird2;
        export let score;
        export let highest_score;
    }
}

declare class JSEncrypt{
    setPublicKey(publicKey: string);
    encrypt(privateKey: string);
}