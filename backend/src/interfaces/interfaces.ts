export interface IResultRequest {
    body?: any;
    error?: any;
    success: boolean;
}

export interface ILeases {

    timestamp: string;
    mac: string;
    ip: string;
    host: string;
    id: string;
}

export interface ITenant {
    Tenant_id: number;
    Name: string;
    Description: string;
    Application_id: number;
    Created_at: string;
}

export interface IDevice{
    Device_id: number;
    Mac: string;
    Default_Name: string;
    Current_Name: string;
    Created_at?: string;
    Updated_at?: string;
}