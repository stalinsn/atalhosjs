// g - global
// i -ignore case

const texto = 'CASDF dsdf 378.142.5 18-50'
// console.log(texto.match(/C|ab/))
// console.log(texto.match(/a|ab/i))
// console.log(texto.match(/.|-/g))

// var cpf = RegExp('.')
// console.log('Visualizacao...')
// console.log(cpf.test(cpf))
// console.log(cpf.exec(cpf))

// const regexCpf = /[a-z]|[\.]|[\-]/gi;
// console.log(texto.replace(regexCpf, '').trim())

const regexCpf = /[a-z]| /gi;    
// return regexCpf.test(texto);
console.log(regexCpf.test(texto.trim()))