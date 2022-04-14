let locationdata = location.search;
let  value = locationdata.split('=');

console.log(decodeURIComponent(value));

// buttonとimgタグの取得
const Reset = document.getElementById('reset');
const Imgs = document.querySelectorAll('.stamp-img');

// リセットボタン
Reset.addEventListener('click',()=>{
	for (let i=0; i < Imgs.length; i++){
		Imgs[i].src = '';
	}
	localStorage.clear()
})

// localStorageからデータを取得し変数に代入
const localdata = localStorage.getItem('stamps');
// jsonデータを読み込み変数に代入
const s = (JSON.parse(localdata));
// もしlocalstoregeが存在すればイメージタグに画像を貼る
if (localdata){
	let c =0;
	Imgs.forEach( Img =>{
		Img.src = s.stamps[c];
		c++;
	});
}

// 保存
const SaveData = () => {
	// 新しい配列を作成
	let StampImgs = [];
	// 6個のimgのsrcを取得し作成した配列に入れる
	Imgs.forEach(img => {
		StampImgs.push(img.getAttribute('src'));
	});
	// オブジェクト形式に変換し変数に代入
	let ObjData = {stamps:StampImgs};
	// オブジェクトをjson形式に変換しlocalstoreageに保存
	localStorage.setItem('stamps',JSON.stringify(ObjData));
}

// スタンプ獲得
const GetStamp = (value) => {
	// TestBtn.addEventListener('click',() =>{
	if (value == "松ヶ岡本陣"){
		Imgs[0].src = 'img/text_get.png';
		SaveData();
	}
	else if (value == "一番蚕室"){
		Imgs[1].src = 'img/text_get.png';
		SaveData();
	}
	else if (value == "二番蚕室"){
		Imgs[2].src = 'img/text_get.png';
		SaveData();
	}
	else if (value == "三番蚕室"){
		Imgs[3].src = 'img/text_get.png';
		SaveData();
	}
	else if (value == "新徴屋敷"){
		Imgs[4].src = 'img/text_get.png';
		SaveData();
	} 
	else if (value == "貯桑土蔵"){
		Imgs[5].src = 'img/text_get.png';
		SaveData();
	}
	else if (value == "テスト"){
		Imgs[6].src = 'img/text_get.png';
		SaveData();
	}
}
GetStamp(decodeURIComponent(value[1]));


// コンプリートした時の処理
if (s.stamps[0]&&s.stamps[1]&&s.stamps[2]&&s.stamps[3]&&s.stamps[4]&&s.stamps[5]=='img/text_get.png') {
	alert('スタンプコンプリートおめでとうございます!!!!');
}