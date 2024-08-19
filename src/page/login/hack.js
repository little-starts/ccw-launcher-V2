window.addEventListener('beforeunload', (event) => {
    // 关闭窗口前确认是否要关闭应用
    event.preventDefault();
    console.log(event);
    event.returnValue = "";
})

window.onload = function () {
    console.log('JavaScript injected successfully!');
    // 这里可以放你需要执行的其他代码
};
