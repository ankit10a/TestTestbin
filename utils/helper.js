const checkEmpty=(obj)=>{
    let err = [];
    for(let key in obj){
        if(![key]){
            err.push([key])
        }
    }
    return {isValid:err.length>0?false:true,error:err}
}

const regexForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


module.exports = {regexForEmail,checkEmpty};