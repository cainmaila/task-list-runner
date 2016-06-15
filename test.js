var tasklist = require('task-list-runner');

//定義完成一個task的callback，並回傳這個task的data
tasklist.endAnTask = function(data) {
    console.log('完成一個task!!', data);
}

//定義完成所有task的callback
tasklist.endCall = function() {
    console.log('駐列所有工作完成!!');
}

//事件1
var task1 = {
    data: { //要傳入的參數可以放這裡
        name: 'task1'
    },
    task: function() {
        var that = this;
        console.log('start run ' + that.data.name);
        setTimeout(function() {
            console.log('start end ' + that.data.name);
            that.tasker.endAndNext(); //事件完成後請呼叫 this.tasker.endAndNext();
        }, 500);
    }
}

//事件2
var task2 = {
    data: {
        name: 'task2'
    },
    task: function() {
        var that = this;
        console.log('start run ' + that.data.name);
        setTimeout(function() {
            console.log('start end ' + that.data.name);
            that.tasker.endAndNext();
        }, 500);
    }
}

//事件1放入駐列
tasklist.push(task1);

// 200毫秒後，事件2放入駐列
setTimeout(function() {
    tasklist.push(task2);
}, 200);
