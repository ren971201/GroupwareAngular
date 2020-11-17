import { Component, OnInit } from '@angular/core';
import { MycheckService } from '../mycheck.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers: [MycheckService,ProductService],
})
export class TopComponent implements OnInit {
  readonly CONSTANT_NUMBER: number = 5; // 指定回数(1ページに表示する項目の数)を定義
  page:number = 1;
  products:any;
  countData:number = 15;

  constructor(private service: MycheckService,private productService: ProductService) { }

  ngOnInit(): void {
    const productsObservable = this.productService.getProductPage(String(this.page));
    productsObservable.subscribe(
      (data)=>{
        this.products = data;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('初期ロード完了');}
    );
  }

  dataLoad(){
    const productsObservable = this.productService.getProductPage(String(this.page));
    productsObservable.subscribe(
      (data)=>{
        this.products = data;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('データ更新');}
    );
  }

  postData(){
    const item ={
      "event":"勉強会",
      "schedule":"2020/11/17",
      "place":"roomY",
      "start":"17:00",
      "end":"18:00"
    }
    this.productService.postProductData(item);
  }

  getInformation() {
    return this.service.information;
  }
  getEvent(n:number) {
    return this.service.get(((this.page)*this.CONSTANT_NUMBER)+n);
  }

  /**
   * @param {index}
   * @returns {any[]}
   */
  arrayNumberLength(number: number): any[] {
    return [...Array(number)];
  }
}
