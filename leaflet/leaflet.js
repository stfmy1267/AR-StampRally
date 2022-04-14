alert('注意書き\n・危険な場所には行かない。\n・人の話を聞くべきときは画面を閉じる。\n・全ては自己責任で楽しむ。\n・誰かにやらせるときにはこれらを守らせる。\n・交通ルール、公共のルールをしっかり守りましょう。\n・歩きスマホは危険です。スマホを確認するときは立ち止まってしましょう。')
let map = L.map('map').fitWorld();
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
map.setView([38.70010302736321, 139.88572398517292],18);
// map.locate({setView:true, maxZoom: 16}); よくわかんないけど中心位置がtrueで自分の今いる位置が表示される

let threshold = 13; //50メートル以内に設定
let id,marker,circle;
// マーカーと緯度経度の設定
// 松ヶ丘開本殿
let a = L.marker([38.7000547037002, 139.884302222165]).addTo(map).bindPopup('<img src="../AR/img/MainImg-2.jpg" style="width:150px;"><br/>' + "松ヶ岡本殿");
a = L.latLng(38.7000547037002, 139.884302222165);
// 一番蚕室・松ケ岡開墾記念館
let b = L.marker([38.700156219219416, 139.8853846828844]).addTo(map).bindPopup('<img src="../img/一番蚕室.jpeg" style="width:150px;"><br/>' + "一番蚕室(松ケ岡開墾記念館)");
b = L.latLng(38.700156219219416, 139.8853846828844);
// 二番蚕室
let c = L.marker([38.69990634769108, 139.88555496066445]).addTo(map).bindPopup('<img src="../img/二番蚕室.jpeg" style="width:150px;"><br/>' + "二番蚕室");
c = L.latLng(38.69990634769108, 139.88555496066445);
// 三番蚕室(おカイコさまの蔵)
let x = L.marker([38.700276684671984, 139.88611289932476]).addTo(map).bindPopup('<img src="../img/三番蚕室.jpeg" style="width:150px;"><br/>' + "三番蚕室(おカイコさまの蔵)");
x = L.latLng(38.700276684671984, 139.88611289932476);
// 寄宿舎(くらふと松ヶ岡こぅでらいね)
let y = L.marker([38.70028849099635, 139.88657682542117]).addTo(map).bindPopup('<img src="../img/こうでらいね.jpeg" style="width:150px;"><br/>' + "寄宿舎(くらふと松ヶ岡こぅでらいね)");
y = L.latLng(38.70028849099635, 139.88657682542117);
// 貯桑土蔵(松岡窯陶芸教室)
let z = L.marker([38.699984888670514, 139.88600858562816]).addTo(map).bindPopup('<img src="../AR/img/MainImg-1.jpg" style="width:150px;"><br/>' + "貯桑土蔵(松岡窯陶芸教室)");
z = L.latLng(38.699984888670514, 139.88600858562816);

function onLocationFound(e) {
    let radius = e.accuracy/2;
    if (marker) map.removeLayer(marker); //マーカー削除
    marker = L.marker(e.latlng).addTo(map); //マーカー追加
    marker.bindPopup('現在地').openPopup();
    if (circle) map.removeLayer(circle);
    circle = L.circle(e.latlng, radius).addTo(map);
    map.setView(e.latlng);
    // 現在地と目的地の距離を計測
    // 50メートル以内に近づいた時の処理
    if (a.distanceTo(e.latlng) < threshold) {
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location1.html');
    } else if(b.distanceTo(e.latlng) < threshold){
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location2.html');
    } else if (c.distanceTo(e.latlng) < threshold){
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location3.html');
    } else if (x.distanceTo(e.latlng) < threshold){
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location4.html');
    } else if (y.distanceTo(e.latlng) < threshold){
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location5.html');
    } else if (z.distanceTo(e.latlng) < threshold){
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location6.html');
    }
}

// 位置情報取得できなかったときの処理
function onLocationError(e) {
    alert(e.message);
}
// 位置情報を持ってくる関数
function watchFound(e) {
    onLocationFound({
    latlng: L.latLng([
    e.coords.latitude, e.coords.longitude]),
    accuracy: e.coords.accuracy});
}
// id = navigator.geolocation.watchPosition(watchFound,onLocationError);

let $start = document.getElementById('start');
// スタートボタンクリック時の位置情報を定期的に取得
$start.addEventListener("click", function(e) {
    this.setAttribute("disabled", true);
    id = navigator.geolocation.watchPosition(watchFound,onLocationError);
});
// 位置情報取得中止
let i=1;
let $stop = document.getElementById('stop')
$stop.addEventListener("click", function(e) {
    $start.removeAttribute("disabled");
    $zuru.removeAttribute("disabled");
    navigator.geolocation.clearWatch(id);
    i=1;
});

// マップクリックしたら経度、緯度の表示
const $zuru = document.getElementById('zuru');
let popup = L.popup();
function onMapClick(e) {
    if (i===0){
    if (marker) map.removeLayer(marker); 
    marker = L.marker(e.latlng).addTo(map); 
    marker.bindPopup('現在地').openPopup();
    if (circle) map.removeLayer(circle);
    circle = L.circle(e.latlng).addTo(map);
    map.setView(e.latlng);
    let d = a.distanceTo(e.latlng);
    let g = b.distanceTo(e.latlng);
    let f = c.distanceTo(e.latlng);
    // 50メートル以内に近づいた時の処理
    if (a.distanceTo(e.latlng) < threshold) {
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location1.html');
    } else if(b.distanceTo(e.latlng) < threshold){
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location2.html');
    } else if (c.distanceTo(e.latlng) < threshold){
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location3.html');
    } else if (x.distanceTo(e.latlng) < threshold){
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location4.html');
    } else if (y.distanceTo(e.latlng) < threshold){
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location5.html');
    } else if (z.distanceTo(e.latlng) < threshold){
        window.location.href=('https://stfmy1267.github.io/AR-StampRally/AR/AR-location6.html');
    }
    }
}
$zuru.addEventListener('click',function (){
    i=0;
    this.setAttribute("disabled", true);
    map.on('click', onMapClick);
});

// setViewまたはcenterで最初に表示される中心位置を設定できる
// zoomで最初に表示される近さを設定できる
// .bindPopupメソッドでHTMLコンテンツを含むポップアップを表示する
// .popup()で表示されるコンテンツを設定できる
// .latlngでその場所の経度、を緯度調べられる
// distanceTo(<LatLng> otherLatLng)で距離が図れる
// LatLng.distanceTo(otherLatLng)で書いたらうまく行った
// let map = L.map('map').setView([38.89232, 139.82221], 15);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);