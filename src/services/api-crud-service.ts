import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiCrudService {

  base_url: string = "//localhost:4000";

  constructor(
    private http: HttpClient
  ) { }

  create = (endpoint: string, body: any) =>
    new Promise((resolve, reject) => {
      this.http.post(`${this.base_url}${endpoint}`, body).forEach(
        (data: any) => {
          resolve(data)
        }
      )
    });
  read = (endpoint: string) =>
    new Promise((resolve, reject) => {
      this.http.get(`${this.base_url}${endpoint}`).subscribe(
        (data: any) => {
          resolve(data)
        }
      )
    });
  update = (endpoint: string, body: any) =>
    new Promise((resolve, reject) => {
      this.http.put(`${this.base_url}${endpoint}`, body).forEach(
        (data: any) => {
          resolve(data)
        }
      )
    });
  delete = (endpoint: string) =>
    new Promise((resolve, reject) => {
      this.http.delete(`${this.base_url}${endpoint}`).forEach(
        (data: any) => {
          resolve(data)
        }
      )
    });
  retrieve = (endpoint: string) =>
    new Promise((resolve, reject) => {
      this.http.get(`${this.base_url}${endpoint}`).forEach(
        (data: any) => {
          resolve(data)
        }
      )
    });
}
