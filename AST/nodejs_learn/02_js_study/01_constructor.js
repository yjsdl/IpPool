var str = '张珊';
console.log(str.constructor);

var arr = [1, 2, 3]
console.log(arr.constructor)

class Test{
    constructor() {}
}


SearchParamModel = function() {
    var n = function() {
        var b = new n.fn.init
        return b
    };
    n.prototype= {
        constructor: n,
        init: function() {
            this.ObjectType = 1;
            this.SearchKeyList = [];
            this.SearchExpression = "";
            this.BeginYear = "";
            this.EndYear = "";
            this.JournalRange = "";
            this.DomainRange = "";
            this.PageSize = "0";
            this.PageNum = "1";
            this.Sort = "0";
            this.ClusterFilter = "";
            this.SType = "";
            this.StrIds = "";
            this.UpdateTimeType = "";
            this.ClusterUseType = "Article";
            this.IsNoteHistory = 0;
            this.AdvShowTitle = "";
            this.ObjectId = "";
            this.ObjectSearchType = "0";
            this.ChineseEnglishExtend = "0";
            this.SynonymExtend = "0";
            this.ShowTotalCount = "0";
            this.AdvTabGuid = ""
        }
    }
    n.fn = n.prototype
    n.fn.init.prototype = n.fn
    return n
};

var te = SearchParamModel()
console.log(te.constructor)


SearchParamModel = function() {
    var n = function() {
        return new n.fn.init
    };
    return n.fn = n.prototype = {
        constructor: n,
        init: function() {
            this.ObjectType = 1;
            this.SearchKeyList = [];
            this.SearchExpression = "";
            this.BeginYear = "";
            this.EndYear = "";
            this.JournalRange = "";
            this.DomainRange = "";
            this.PageSize = "0";
            this.PageNum = "1";
            this.Sort = "0";
            this.ClusterFilter = "";
            this.SType = "";
            this.StrIds = "";
            this.UpdateTimeType = "";
            this.ClusterUseType = "Article";
            this.IsNoteHistory = 0;
            this.AdvShowTitle = "";
            this.ObjectId = "";
            this.ObjectSearchType = "0";
            this.ChineseEnglishExtend = "0";
            this.SynonymExtend = "0";
            this.ShowTotalCount = "0";
            this.AdvTabGuid = ""
        }
    },
        n.fn.init.prototype = n.fn,
        n
}();

console.log(Test.constructor)