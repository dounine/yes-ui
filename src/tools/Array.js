Array.prototype.removeByValue = function(val,fun) {
    for(let i=0,len=this.length; i<len; i++) {
        if(this[i] === val) {
            this.splice(i, 1);
            if(fun){
                return fun(this[i])
            }
            break;
        }
    }
}
Array.prototype.removeByKey = function(key,value) {
    for(let i=0,len=this.length; i<len; i++) {
        if(this[i][key] === value) {
            this.splice(i, 1);
            break;
        }
    }
}
Array.prototype.containKeyValue = function(key,value) {
    let isFind = false
    for(let i=0,len=this.length; i<len; i++) {
        if(this[i][key] === value) {
            isFind = true
            break
        }
    }
    return isFind
}