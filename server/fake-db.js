const Product = require('./model/product');

class FakeDb {

    constructor() {
        this.products = [
            {"event":"ESマネージャ会議", "schedule":"2020-09-27", "place":"本社ミーティングルーム4", "start":"10:00", "end":"12:00"},
            {"event":"システム1部勉強会(React)", "schedule":"2020-10-02", "place":"東京オフィス来客用", "start":"13:00", "end":"14:00"},
            {"event":"システム1部S1勉強会(サキ)", "schedule":"2020-10-08", "place":"サキ会議室", "start":"18:00", "end":"19:00"},
            {"event":"リクルートツール写真撮影", "schedule":"2020-10-30", "place":"TC RoomG", "start":"9:40", "end":"10:10"},
            {"event":"若手教育(登チーム)振返り", "schedule":"2020-10-31", "place":"東京オフィス来客用", "start":"18:00", "end":"19:00"},
            {"event":"説明会", "schedule":"2020-11-01", "place":"ミーティングルーム1", "start":"18:00", "end":"19:00"},
            {"event":"ウェブ会議", "schedule":"2020-11-01", "place":"ミーティングルーム4", "start":"18:00", "end":"19:00"},
            {"event":"lunch meeting", "schedule":"2020-11-03", "place":"roomG", "start":"12:00", "end":"13:00"},
            {"event":"会社説明会", "schedule":"2020-11-04", "place":"休憩室", "start":"10:00", "end":"12:00"},
            {"event":"ウェブ会議（週次）", "schedule":"2020-11-05", "place":"roomY", "start":"18:00", "end":"19:00"},
            {"event":"打ち合わせ", "schedule":"2020-11-06", "place":"roomG", "start":"15:00", "end":"16:00"},
            {"event":"進捗報告", "schedule":"2020-11-13", "place":"roomR", "start":"12:00", "end":"13:00"},
            {"event":"説明会", "schedule":"2020-11-15", "place":"ミーティングルーム4", "start":"18:00", "end":"19:00"},
            {"event":"勉強会", "schedule":"2020-11-21", "place":"ミーティングルーム2", "start":"18:00", "end":"19:00"},
            {"event":"lunch meeting", "schedule":"2020-11-30", "place":"roomG", "start":"12:00", "end":"13:00"}
        ]
    }

    async initDb() {
        await this.cleanDb();
        this.pushProductsToDb();
    }

    async cleanDb() {
        await Product.deleteMany({});
    }

    pushProductsToDb() {
        this.products.forEach(
            (product) => {
                const newProduct = new Product(product);
                newProduct.save();
            }
        )
    }

    seeDb() {
        this.pushProductsToDb()
    }
}

module.exports = FakeDb;