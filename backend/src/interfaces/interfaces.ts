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
    isStatic: boolean;
    isADrone: boolean;
}

export interface ITenant {
    Tenant_id: number;
    Name: string;
    Description: string;
    Application_id: number;
    Created_at: string;
}

export interface IDevice{
    device_id: number;
    mac_address?: string;
    ip?: string;
    default_name?: string;
    current_name?: string;
    is_static?: boolean;
    is_drone?: boolean;
    created_at?: any;
    updated_at?: any;
}