let dataArray = [];
export const buffer = {
    valid() {
        return dataArray.length > 0;
    },
    push(dataNew){
        dataArray.push(dataNew);
    },
    get(){
        return !Buffer.valid ? dataArray.shift() : undefined
    }
}