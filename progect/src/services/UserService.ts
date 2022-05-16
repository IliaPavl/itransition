import $api from "../http";
import {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
    
    static async roleChange(id: any[]): Promise<AxiosResponse<IUser[]>> {
        return $api.post<IUser[]>('/users/roleChange', {id})
    }

    static async deliteUser(id: any[]): Promise<AxiosResponse<IUser[]>>{
    return $api.post<IUser[]>('/users/deliteUser', {id})
    }

    static async changeBlock(id: any[]): Promise<AxiosResponse<IUser[]>>{
        return $api.post<IUser[]>('/users/changeBlock', {id})
    }


    static async searcUsers(searchLable: string): Promise<AxiosResponse<IUser[]>>{
        return $api.post<IUser[]>('/users/search', {searchLable})
    }

    
    
}

