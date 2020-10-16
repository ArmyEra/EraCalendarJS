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

function ClampValue(value, size){
    if(value < 0)
        return size + value;
    return value % size;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addMonths = function(months) {
    var date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + months);
    return date;
}

Date.prototype.addYears = function(years) {
    var date = new Date(this.valueOf());
    date.setFullYear(date.getFullYear() + years);
    return date;
}