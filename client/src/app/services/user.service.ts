import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiURL}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiURL}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiURL}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiURL}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiURL}/users/` + id);
    }
}
