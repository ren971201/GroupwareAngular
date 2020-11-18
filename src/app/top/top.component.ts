import { Component, OnInit } from '@angular/core';
import { MycheckService } from '../mycheck.service';
import { ProductService } from '../shared/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  event:string = "";
  schedule:string = "";
  place:string = "";
  start:string = "";
  end:string = "";
  postForm:FormGroup;
  listPlace = [
    { name : "ミーティングルーム1" },
    { name : "ミーティングルーム2" },
    { name : "ミーティングルーム4" },
    { name : "応接室" },
    { name : "特別会議室" },
    { name : "休憩室" },
    { name : "roomR" },
    { name : "roomB" },
    { name : "roomY" },
    { name : "roomG" }
  ]
  visiblePostForm:boolean = false;
  btnMessage:string = "イベントを追加";

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
    this.postForm= new FormGroup({
      event:new FormControl('', [Validators.required]),
      schedule:new FormControl('', [Validators.required]),
      place:new FormControl('', [Validators.required]),
      start:new FormControl('', [Validators.required]),
      end:new FormControl('', [Validators.required])
    });
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
    const newData ={
      "event":this.event,
      "schedule":this.schedule,
      "place":this.place,
      "start":this.start,
      "end":this.end
    };  
    this.productService.postProductData(newData);
    this.reloadPageCount();
    this.postForm.reset();
  }

  // お知らせを取得
  getInformation() {
    return this.service.information;
  }

  // イベント登録フォームの表示非表示
  onClickBtnPostEvent() {
    this.visiblePostForm = !this.visiblePostForm;
    if(this.visiblePostForm){
      this.btnMessage="閉じる";
    }
    else {
      this.btnMessage = "イベントを追加";
    }
  }

  /**
   * @param {index}
   * @returns {any[]}
   */
  arrayNumberLength(number: number): any[] {
    return [...Array(number)];
  }
}
