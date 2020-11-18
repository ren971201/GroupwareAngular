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
  page:number = 1;// ページネーションの現在のページ
  products:any;// 取得したデータを格納する
  countData:number;// データの総数
  event:string = "";// イベントフォームにバインディング
  schedule:string = "";// 日程フォームにバインディング
  place:string = "";// 場所フォームにバインディング
  start:string = "";// 開始時刻フォームにバインディング
  end:string = "";// 終了時刻フォームにバインディング
  postForm:FormGroup;// イベント登録フォームのグループ
  listPlace = [// 場所の一覧
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
  visiblePostForm:boolean = false;// イベント登録フォームの表示非表示
  btnMessage:string = "イベントを追加";// ボタンに表示するメッセージ

  constructor(private service: MycheckService,private productService: ProductService) { 
    this.loadPageCount();// データ数を初期化
  }

  ngOnInit(): void {
    this.loadPageCount();
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
  loadPageCount(){
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
  loadData(){
    this.productService.getProductPage(String(this.page))
    .subscribe(
      (data)=>{
        this.products = data;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('データ更新');}
    );
  }

  // データの追加
  postData(){
    const newData ={
      "event":this.event,
      "schedule":this.schedule,
      "place":this.place,
      "start":this.start,
      "end":this.end
    };  
    this.productService.postProductData(newData);// データベースにポスト
    this.postForm.reset();
    this.loadPageCount();
    this.loadData();
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

  // 指定回数ループするための仮の配列
  /**
   * @param {index}
   * @returns {any[]}
   */
  arrayNumberLength(number: number): any[] {
    return [...Array(number)];
  }
}
