const thisIsAnother = async ()=>{
    console.log('this is from the async function')
}

const tryFunction = async ()=>{
    await thisIsAnother()
    
}
tryFunction()
console.log('hello wrold')



