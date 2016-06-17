# task-list-runner

## 駐列任務處理器

#### install

```bash
npm install task-list-runner
```

#### 使用說明

```
var tasklist = require('task-list-runner');

//定義完成一個task的callback，並回傳這個task的data
tasklist.endAnTask = function(data) {
    console.log('完成一個task!!', data);
}

//定義完成所有task的callback
tasklist.endCall = function() {
    console.log('駐列所有工作完成!!');
}

//任務1
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

//任務2
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

//任務1放入駐列
tasklist.push(task1);

// 200毫秒後，任務2放入駐列
setTimeout(function() {
    tasklist.push(task2);
}, 200);

```

**以上例子，tasklist物件會幫你依序執行task1與task2中的task方法**

宣告任務處理器
```
var tasklist = require('task-list-runner');
```

你必須覆寫定義完成一個task的callback，並回傳這個他會傳回這個task中的data物件
```
tasklist.endAnTask
```

你必須覆寫定義完成所有任務時呼叫的callback
```
tasklist.endCall
```

task版型
```
var task1 = {
    data: { //要傳入的參數可以放這裡
        name: 'task1'
    },
    task: function() {
        var that = this;
        console.log('start run ' + that.data.name);
        setTimeout(function() {
            console.log('start end ' + that.data.name);
            that.tasker.endAndNext(); //事件完成後請呼叫             this.tasker.endAndNext();
        }, 500);
    }
}
```
**task1.data** 需要利用的數據可以放這裡
**task1.task** 這是一個函示，會依照駐列任務執行
**task1.tasker.endAndNext** 任務完成後不管成功或失敗，你利用這個方法告訴任務處理器，task1.tasker 即為任務處理器本身，task1.tasker.endAndNext()同等於 tasklist.endAndNext()

你可以利用下面方法來清空你的駐列，執行後駐列將不會繼續下一個任務
```
tasklist.stop()
```

