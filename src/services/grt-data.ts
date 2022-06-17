import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GrtDataService {

    service: Subject<{
        [key: string]: any
    }> = new Subject<{ [key: string]: any }>();

    endpoints = {
        'person-suffixes': {
            key: 'personSuffix',
            transform: [
                'name', 'desc'
            ],
            endpoint: 'https://www.ssa.gov/uef/data/name-suffix.json'
        },
        'person-titles': {
            key: 'personTitle',
            transform: false,
            endpoint: 'https://www.ssa.gov/uef/data/name-title.json'
        },
        'us-states': {
            key: 'usStates',
            transform: [
                'name', 'abbr'
            ],
            endpoint: 'https://www.ssa.gov/uef/data/states-usps.json'
        }
    };

    constructor(
        private http: HttpClient
    ) { }

    get<T extends 'person-suffixes' | 'person-titles' | 'us-states'>(...options: Array<T>): Subject<{ [key: string]: any }> {

        const items = options.map(key => this.endpoints[key]);

        const promises = [
            ...items
        ].map(({ key, transform, endpoint }) => new Promise(
            resolve => this.http.get<Array<any>>(endpoint).forEach(data => resolve({ [key]: { data: data, transform: transform } }))
        ));

        Promise.all(promises).then((result) => this.extractData(result));

        return (
            this.service
        );
    }

    extractData(result: Array<any>): void {

        let d = {};

        result.forEach((x: any) => {

            Object.keys(x).forEach(key => {

                let { data, transform } = x[key];

                if (transform) {

                    data = this.transform(data, transform);
                }

                d = { ...d, [key]: JSON.stringify(data) }
            })
        });
        this.service.next(d);
    }

    transform(data: Array<any>, keys: Array<string>): Array<any> {

        let items: any = [];

        const [a, b] = keys;

        data.forEach((x: any) => {
            items = [
                ...items, {
                    label: x[a], value: x[b]
                }]
        });
        return items;
    }
}
