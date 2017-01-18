console.log('this - [global]');
console.log(this);
console.log('-------------------------------');

function greet() {
    console.log('this - [global > greet()]');
    console.log(this);
    console.log('-------------------------------');
}

greet();

var anonGreet = function() {
    console.log('this - [global > anonGreet()]');
    console.log(this);
    console.log('-------------------------------');
};

anonGreet();

var myObject = {
    name: 'John Smith',
    log: function() {
        console.log('this - [global > myObject{} > log()]');
        this.name = 'Tom Ramen';
        console.log(this);
        console.log('-------------------------------');

        var deeperLog = function() {
            console.log('this - [global > myObject{} > log() > deeperLog()]');
            console.log(this);
            console.log('-------------------------------');
        };

        deeperLog();
    }
};

myObject.log();





