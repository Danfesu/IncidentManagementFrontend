
export interface SolutionManager {
    id:     number;
    name:   string;
    groups: Group[];
}

export interface Group {
    id:                number;
    name:              string;
    solutionManagerId: number;
    analysts:          Analyst[];
}

export interface Analyst {
    id:       number;
    name:     string;
    email:    string;
    group_id: number;
}
