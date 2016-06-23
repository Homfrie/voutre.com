export default (str = "", cssModule) => str.split(" ")
                            .map(c => !~c.indexOf("__") ? cssModule[c] : c)
                            .join(" ");

