function Range(count, startIndex = 0, content){
    var result = [];
    if(typeof content == "function") {
        for(var i = 0; i < count; i++) {
            result.push(content(i));
        }
    } else {
        for(var i = 0; i < count; i++) {
            result.push(i);
        }
    }
    return result;
}

function Repeat(source, count){
    var result = [];
    for(var i = 0; i < count; i++)
        result.push(source)
    return result;
}