// Generated by https://quicktype.io

export interface Application {
    id:              number;
    name:            string;
    clusteredErrors: ClusteredError[];
}

export interface ClusteredError {
    id:             number;
    description:    string;
    application_id: number;
}