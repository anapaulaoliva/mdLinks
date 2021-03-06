const fetch = require('node-fetch');

module.exports.getStatusLink = (array) => {

    return new Promise((resolve, reject)=> {
        
        const newArray = array.map( (element) => {
            
            return new Promise((resolve, reject)=> {
                
                fetch(element.Href)
                .then((res) => {
                    let object = {
                        Href: res.url,
                        Text: element.Text,
                        Status: res.status,
                        StatusText: res.statusText
                        };
                    resolve(object);
                })
                .catch((err)=>{
                    reject("Error at element.href fetch", err)
                })
            })
        })        
        Promise.all(newArray).then((res)=> {
            resolve(res);
        
        })
        .catch((err) => {
            reject("Error at node-fetch request", err)
        })
    });

}