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
  tableSize:number;// データの総数
  postFormValue:Event= <Event>{};// イベント追加フォームにバインディング
  postForm:FormGroup;// イベント登録フォームのグループ
  listPlace = environment.listPlace.slice(0,environment.listPlace.length);// 場所の一覧
  visiblePostForm:boolean = false;// イベント登録フォームの表示非表示
  btnMessage:string = "イベントを追加";// ボタンに表示するメッセージ
  listEvents:object;
  listEventsDynamoDB:object;
  visibleList:boolean = false;

  constructor(private localService: LocalService,private mongodbService: MongodbService, private dynamodbService: DynamodbService) { 
    this.getTableSize();// データ数を初期化
  }

  ngOnInit(): void {
    this.getTableSize();
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

  // 総数を取得
  getTableSize(){
    this.mongodbService.getTabelSize()
    .subscribe(
      (result)=>{
        this.tableSize = result;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('テーブルのサイズを取得完了');}
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
    this.mongodbService.postEventData(this.postFormValue);// データベースにポスト
    this.postForm.reset();
    this.getTableSize();
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
