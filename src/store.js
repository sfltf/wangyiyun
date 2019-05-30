// 公用数据
const commonData = {
	playSongList: []
}
if(localStorage.getItem('playList')) {
	commonData.playSongList = localStorage.getItem('playList');
}

export default commonData;