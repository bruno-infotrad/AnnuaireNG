import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Org } from '../models/org.model';

const baseUrl = 'http://localhost:8080/api/orgs';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Org[]> {
    return this.http.get<Org[]>(baseUrl);
  }

  get(id: any): Observable<Org> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findById(id: any): Observable<Org[]> {
    return this.http.get<Org[]>(`${baseUrl}?id=${id}`);
  }
  findByOrgname(orgname: any): Observable<Org[]> {
    return this.http.get<Org[]>(`${baseUrl}?orgname=${orgname}`);
  }
}
