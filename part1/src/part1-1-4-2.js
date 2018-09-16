function longRunningTask() {
console.log('finish');
}
console.log('start');
setTimeout(longRunningTask,0);
console.log('next task');