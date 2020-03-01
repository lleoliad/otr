declare class user {
    id: number;

    /**
     * 时区
     */
    time_zone: number;

    /**
     * 时间
     */
    server_date: server_date;
}

declare class server_date {
    millisecond: number;
}