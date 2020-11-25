import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../../services/local.service';
import { MongodbService } from '../../../services/mongodb.service';
import { DynamodbService } from '../../../services/dynamodb.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Event from '../../../domain/Event'
import { environment } from 'src/environments/environment';
import { textSpanIsEmpty } from 'typescript';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers: [LocalService,MongodbService, DynamodbService],
})
export class TopComponent implements OnInit {
  readonly limitPage: number = environment.limitPage; // 指定回数(1ページに表示する項目の数)を定義
  page:number = 1;// ページネーションの現在のページ
  countData:number;// データの総数
  event:string = "";// イベントフォームにバインディング
  schedule:string = "";// 日程フォームにバインディング
  place:string = "";// 場所フォームにバインディング
  start:string = "";// 開始時刻フォームにバインディング
  end:string = "";// 終了時刻フォームにバインディング
  postForm:FormGroup;// イベント登録フォームのグループ
  listPlace = environment.listPlace.slice(0,environment.listPlace.length);// 場所の一覧
  visiblePostForm:boolean = false;// イベント登録フォームの表示非表示
  btnMessage:string = "イベントを追加";// ボタンに表示するメッセージ
  listEvents;
  listEventsDynamoDB;
  visibleList:boolean = false;

  constructor(private localService: LocalService,private mongodbService: MongodbService, private dynamodbService: DynamodbService) { 
    this.getPageCount();// データ数を初期化
  }

  ngOnInit(): void {
    this.getPageCount();
    this.mongodbService.getEventPage(this.page)
    .subscribe(
      (result)=>{
        this.listEvents = result;
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
  getPageCount(){
    this.mongodbService.getEvents()
    .subscribe(
      (result)=>{
        this.countData = result.length;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('ロード完了');}
    );
  }

  // ページネーションのページ切り替え時の処理
  loadEventPage(){
    this.mongodbService.getEventPage(this.page)
    .subscribe(
      (result)=>{
        this.listEvents = result;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('データ更新');}
    );
  }

  // データの追加
  postEvent(){
    const newEvent:Event ={
      "event":this.event,
      "schedule":this.schedule,
      "place":this.place,
      "start":this.start,
      "end":this.end
    };
    console.log(newEvent);  
    this.mongodbService.postEventData(newEvent);// データベースにポスト
    this.postForm.reset();
    this.getPageCount();
    this.loadEventPage();
  }

  // お知らせを取得
  getInformation() {
    return this.localService.information;
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

  getEventsByDynamoDB() {
    this.dynamodbService.getEvents()
    .subscribe(
      (val) => {
          const result = JSON.parse(val);
          this.listEventsDynamoDB = result.Items;
          this.visibleList = true;
      },
      response => {
          console.log("call in error", response);
      },
      () => {
          console.log("completed.");
      }
    );// これでリクエストが送信可能
;
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
