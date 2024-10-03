function timeScreen(time){
    let hour = time /3600;
    let remnaiSec = time % 3600;


    return `${hour} h ${remnaiSec} s ago`
}