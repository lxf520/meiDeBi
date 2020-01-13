let Cookie = {
    getItem(name) {
        let cookies = document.cookie.split("; ");

        //注意：在forEach方法中不能使用return语句
        // cookies.forEach(ele => {
        //     let arr = ele.split("=");
        //     console.log(arr[0], name);
        //     if (name == arr[0]) {
        //         console.log("------");
        //         return arr[1];
        //     }
        // });
        for (let i = 0; i < cookies.length; i++) {
            let arr = cookies[i].split("=");
            if (name == arr[0]) return arr[1];
        }
    },
    setItem(name, value, days) {
        if (days) {
            var date = new Date();
            date.setDate(date.getDate() + days);
            document.cookie = `${name}=${value};expires=${date}`;
        } else {
            document.cookie = `${name}=${value}`;
        }
    },
    removeItem(name) {
        this.setItem(name, null, -1);
    },
    hasItem(name) {
        let keys = this.keys();
        let flas = false;
        if (keys) {
            flas = keys.includes(name);
        }
        return flas;
    },
    clear() {
        let keys = this.keys();
        keys.forEach(ele => {
            this.removeItem(ele);
        })
    },
    keys() {
        let result = [];
        let cookies = document.cookie.split("; ");
        cookies.forEach(ele => {
            let arr = ele.split("=");
            result.push(arr[0]);
        });
        return result;
    }
}