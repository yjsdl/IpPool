function add(a,b) {
        return a+b
}

function square(n) {
    return n * n;
  }

function scopeOne() {
    var one = "I am in the scope created by `scopeOne()`";
    console.log(one);

    function scopeTwo() {
        one = "I am updating the reference in `scopeOne` inside `scopeTwo`";
        console.log(one);
    }
    scopeTwo();
}
var test1 = new scopeOne()
console.log(test1);