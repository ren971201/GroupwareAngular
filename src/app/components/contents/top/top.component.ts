import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../../services/information/local.service';
import { EventMongodbService } from '../../../services/event/mongodb.service';
import { EventDynamodbService } from '../../../services/event/dynamodb.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Event from '../../../domain/event'
import { environment } from 'src/environments/environment';
import EventService from 'src/app/services/event/EventService';
import InformationService from 'src/app/services/information/informationService';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers: [LocalService,EventMongodbService, EventDynamodbService],
})
export class TopComponent implements OnInit {
  readonly limitPage: number = environment.limitPage; // 指定回数(1ページに表示する項目の数)を定義
  page:number;// ページネーションの現在のページ
  tableSize:number;// データの総数
  postForm:FormGroup;// イベント登録フォームのグループ
  listPlace = environment.listPlace.slice(0,environment.listPlace.length);// 場所の一覧
  visiblePostForm:boolean = false;// イベント登録フォームの表示状態
  btnMessage:string;// ボタンに表示するメッセージ
  listEvents:object;// mongoDBからの取得結果
  listEventsDynamoDB:object;// DynamoDBからの取得結果
  visibleList:boolean;// DynamoDBから取得した結果の表示状態

  constructor(
    private informationService: InformationService,
    private eventService: EventService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.page = 1;
    this.visiblePostForm = false;
    this.visibleList = false;
    this.btnMessage = "イベントを追加";
    this.getTableSize();
    this.eventService.getEventPage(this.page)
    .subscribe(
      (result)=>{
        this.listEvents = result;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('初期ロード完了');}
    );
    this.postForm= this.fb.group({
      event:['', Validators.required],
      schedule:['', Validators.required],
      place:['', Validators.required],
      start:['', Validators.required],
      end:['', Validators.required]
    });
  }

  // 総数を取得
  getTableSize(){
    this.eventService.getTableSize()
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
    this.eventService.getEventPage(this.page)
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
    const postFormValue:Event= this.postForm.value;// フォームに入力された値を登録用に変換
    this.eventService.postEventData(postFormValue);// データベースにポスト
    this.postForm.reset();// フォームを空に
    this.ngOnInit();// コンポーネントを更新
  }

  // お知らせを取得
  getInformation() {
    return this.informationService.getInformation;
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
    this.eventService.getEvents()
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
