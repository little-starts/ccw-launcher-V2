console.log('注入');
const interval = setInterval(() => {
    console.log('注入');
    try {
        if (document.getElementsByClassName("c-avatar-img")[0] && document.getElementsByClassName("container-3N3ii")[0].contains(document.getElementsByClassName("c-avatar-img")[0])) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementsByClassName("item-13OiL")[0].click();
            }, 100);
        }
    } catch (e) {
        console.log(e);
    }
}, 100);