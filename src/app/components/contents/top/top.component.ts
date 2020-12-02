import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Event from '../../../domain/event'
import { environment } from 'src/environments/environment';
import { EventServiceProvider } from 'src/app/services/event/event.service.provider';
import { InformationServiceProvider } from 'src/app/services/information/information.service.provider';
import { EventService } from '../../../services/event/event.service'
import { USE_MONGODB } from 'src/app/app.config';
import { InformationService } from 'src/app/services/information/information.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers: [EventServiceProvider, InformationServiceProvider]
})
export class TopComponent implements OnInit {
  readonly limitPage: number = environment.limitPage; // 指定回数(1ページに表示する項目の数)を定義
  page:number;// ページネーションの現在のページ
  tableSize:number;// データの総数
  postForm:FormGroup;// イベント登録フォームのグループ
  listPlace = environment.listPlace.slice(0,environment.listPlace.length);// 場所の一覧
  btnMessage:string;// ボタンに表示するメッセージ
  listEvents:object;// DBからの取得結果
  listInformation:object;// mongoDBからのインフォメーション取得結果
  listEventsDynamoDB:object;// DynamoDBからのイベント取得結果
  isVisiblePostForm:boolean = false;// イベント登録フォームの表示状態
  isVisibleList:boolean;// DynamoDBから取得した結果の表示状態
  isUsingMongoDB:boolean = true;// MongoDBを使用するか

  constructor(
    private eventService: EventService,
    private informationService: InformationService, 
    private fb: FormBuilder,
    @Inject(USE_MONGODB) private useMongoDB:boolean
  ){}

  ngOnInit(): void {
    this.page = 1;
    this.isVisiblePostForm = false;
    this.isVisibleList = false;
    this.isUsingMongoDB = this.useMongoDB
    this.btnMessage = "イベントを追加";
    this.getTableSize();
    this.getInformation();
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
    this.informationService.getInformation()
    .subscribe(
      (result)=>{
        this.listInformation = result.information;
      },
      (err)=>{console.log('エラー:'+err);},
      ()=>{console.log('データ更新');}
    )
  }

  // イベント登録フォームの表示非表示
  onClickBtnPostEvent() {
    this.isVisiblePostForm = !this.isVisiblePostForm;
    if(this.isVisiblePostForm){
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
          this.isVisibleList = true;
      },
      response => {
          console.log("call in error", response);
      },
      () => {
          console.log("completed.");
      }
    );// これでリクエストが送信可能
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
