module.exports = function() {
    return {
        list: [],
        start: function() {
            if (this.isRuning) return;
            if (this.list.length > 0) {
                this.isRuning = true;
                this.runingTask = this.list.shift();
                this.next();
            } else {
                this.runingTask = null;
                setTimeout(this.endCall,1);
            }
        },
        isRuning: false,
        runingTask: null,
        nextData: null,
        next: function() {
            this.runingTask.tasker = this;
            this.runingTask.task();
        },
        endAndNext: function() {
            this.endAnTask(this.runingTask.data);
            this.isRuning = false;
            this.start();
        },
        endAnTask: function(data) {
            console.warn(data, 'Please override method endAnTask!!');
        },
        endCall: function() {
            console.warn('Please override method endCall!!');
        },
        push: function(task) {
            this.list.push(task);
            this.start();
        },
        stop: function() {
            this.list = [];
        }
    }
};