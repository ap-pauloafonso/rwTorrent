import { CardPeerModel } from "../Components/card-peer/card-peer-model";

export class StatusReponseDTO {
    name: string;
    progress: number;
    download_rate: number;
    upload_rate: number;
    state_str: string;
    total_download: number;
    total_upload: number;
    all_time_download: number;
    info_hash: string;
    downloading_piece_index: number[];
    num_pieces: number;
    sequential_download: boolean;
    paused: boolean;
    total_size: number;
    total_wanted_done: number;
    total_done: number;
    peers: Peer[]
    piece_count: number;
    piece_total: number;
    piece_size: number;
    pieces:boolean[];
    estimated_time:any;
    num_seeds:number;
    num_peers:number;
    availability:number;
    location:string;

    download_limit:number;
    upload_limit:number;



}

export class Peer {
    ip: string;
    port: number;
    client: string;
    total_download: number;
    total_upload: number;
    down_speed: number;
    up_speed: number;
    country: string;
    progress: number;
    flags: number;
}