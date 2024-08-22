setInterval(() => {
    try {
        document.getElementsByClassName("item-13OiL")[8].click();
        alert("退出成功");
    } catch (e) {
        console.log(e);
    }
}, 1000);