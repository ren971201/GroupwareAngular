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

  constructor(private service: MycheckService,private productService: ProductService) {
    this.reloadPageCount();
  }

  ngOnInit(): void {
    this.productService.getProductPage(String(this.page))
    .subscribe(
      (data)=>{
        this.products = data;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('初期ロード完了');}
    );
  }

  // 総ページ数を取得
  reloadPageCount(){
    this.productService.getProducts()
    .subscribe(
      (data)=>{
        this.countData = data.length;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('ロード完了');}
    );
  }

  // ページネーションのページ切り替え時の処理
  dataLoad(){
    this.productService.getProductPage(String(this.page))
    .subscribe(
      (data)=>{
        this.products = data;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('データ更新');}
    );
  }

  // データの追加処理
  postData(){
    const item ={
      "event":"勉強会",
      "schedule":"2020/11/17",
      "place":"roomY",
      "start":"17:00",
      "end":"18:00"
    }
    this.productService.postProductData(item);
    this.reloadPageCount();
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
