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
    copterID: string;
    isStatic: boolean;
    isADevice: boolean;
    isActive: boolean;
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
    copter_id?: string;
    ip?: string;
    default_name?: string;
    current_name?: string;
    is_static?: boolean;
    is_drone?: boolean;
    is_device?: boolean;
    created_at?: any;
    updated_at?: any;
    is_active?: boolean;
}