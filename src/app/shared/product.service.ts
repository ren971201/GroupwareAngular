import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()

export class ProductService {
    constructor(private http: HttpClient){ }

    getProducts(): Observable<any> {
        return this.http.get('/api/v1/products');
    }

    getProductPage(page:string): Observable<any> {
        return this.http.get('/api/v1/products/'+page);
    }

    postProductData(item){
        this.http.post('/api/v1/products/comit',item, {responseType: 'text'})
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", val);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            }
        );// これでリクエストが送信可能
    }
}