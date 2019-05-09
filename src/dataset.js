function getDataset(ele){
    if(ele.dataset){
        return ele.dataset;
    }else{
        var attrs = ele.attributes,//元素的属性集合
            dataset = {}, name, matchStr;
        for(var i = 0;i<attrs.length;i++){ //是否是data- 开头
            matchStr = attrs[i].name.match(/^data-(.+)/);
            if(matchStr){ //data-auto-play 转成驼峰写法 autoPlay
                 name = matchStr[1].replace(/-([\da-z])/gi,function(all,letter){
                     return letter.toUpperCase(); });
                 dataset[name] = attrs[i].value;
            }
        }
        return dataset;
    }
}

export default getDataset