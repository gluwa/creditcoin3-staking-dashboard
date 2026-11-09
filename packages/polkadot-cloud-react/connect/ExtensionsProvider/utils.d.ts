import { AnyJson } from "../../utils/types";
import { SnapRpcMethodRequest } from "@chainsafe/metamask-polkadot-types";
declare global {
    interface Window {
        injectedWeb3?: AnyJson;
        ethereum: {
            isMetaMask: boolean;
            send: (request: SnapRpcMethodRequest | {
                method: string;
                params?: never[];
            }) => Promise<unknown>;
            on: (eventName: unknown, callback: unknown) => unknown;
            request: <T>(request: SnapRpcMethodRequest | {
                method: string;
                params?: any;
            }) => Promise<T>;
        };
    }
}
export declare const polkadotSnapAvailable: () => Promise<boolean>;
