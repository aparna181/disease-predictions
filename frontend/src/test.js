// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let j = 0; j < 5; j++){
//         num += "* "
//     }
//     console.log(num);
// }
// output: - 
// * * * * *
// * * * * *
// * * * * *
// * * * * *
// * * * * *


// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let j = 0; j <= i; j++){
//         num += "* "
//     }
//     console.log(num);
// }
// output: - 
// * 
// * *
// * * *
// * * * *
// * * * * *


// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let k = 4-i; k > 0; k--){
//         num += "  "
//     }
//     for(let j = 0; j <= i; j++){
//         num += "* "
//     }
//     console.log(num);
// }
// output: - 
//         * 
//       * *
//     * * *
//   * * * *
// * * * * *


// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let k = 4-i; k > 0; k--){
//         num += "  "
//     }
//     for(let j = 0; j <= i; j++){
//         num += "* "
//     }
//     for(let j = 0; j <= i-1; j++){
//         num += "* "
//     }
//     console.log(num);
// }
// output: - 
//         * 
//       * * * 
//     * * * * *
//   * * * * * * *
// * * * * * * * * *


// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let j = 5; j > i; j--){
//         num += "* "
//     }
//     console.log(num);
// }
// output: - 
// * * * * * 
// * * * * 
// * * *
// * *
// *


// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let k = 0; k < i; k++){
//         num += "  "
//     }
//     for(let j = 5; j > i; j--){
//         num += "* "
//     }
//     console.log(num);
// }
// output: - 
// * * * * *
//   * * * *
//     * * *
//       * *
//         * 


// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let k = 0; k < i; k++){
//         num += "  "
//     }
//     for(let j = 5; j > i; j--){
//         num += "* "
//     }
//     for(let j = 5; j > i+1; j--){
//         num += "* "
//     }
//     console.log(num);
// }
// output: - 
// * * * * * * * * *
//   * * * * * * *
//     * * * * *
//       * * *
//         * 


// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let k = 4-i; k > 0; k--){
//         num += "  "
//     }
//     for(let j = 0; j <= i; j++){
//         num += "* "
//     }
//     console.log(num);
// }
// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let k = 0; k < i+1; k++){
//         num += "  "
//     }
//     for(let j = 5; j > i+1; j--){
//         num += "* "
//     }
//     console.log(num);
// }
// output: - 
//         * 
//       * *
//     * * *
//   * * * *
// * * * * *
//   * * * *
//     * * *
//       * *
//         * 


// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let j = 0; j <= i; j++){
//         num += "* "
//     }
//     console.log(num);
// }
// for(let i = 0; i < 5; i++){
//     let num = ""
//     for(let j = 5; j > i+1; j--){
//         num += "* "
//     }
//     console.log(num);
// }
// Output: - 
// * 
// * * 
// * * *
// * * * *
// * * * * *
// * * * *
// * * *
// * *
// *


for(let i = 0; i < 5; i++){
    let num = ""
    for(let k = 4-i; k > 0; k--){
        num += "  "
    }
    for(let j = 0; j <= i; j++){
        num += "* "
    }
    for(let j = 0; j <= i-1; j++){
        num += "* "
    }
    console.log(num);
}
for(let i = 0; i < 4; i++){
    let num = ""
    for(let k = 0; k < i+1; k++){
        num += "  "
    }
    for(let j = 4; j > 2*i-3; j--){
        num += "* "
    }
    console.log(num);
}
for(let i = 0; i < 2; i++){
    let num = ""
    for(let k = 4-i; k > 0; k--){
        num += "  "
    }
    for(let j = 0; j <= 2*i; j++){
        num += "* "
    }
    console.log(num);
}
// Output: -
//         * 
//       * * * 
//     * * * * *
//   * * * * * * *
// * * * * * * * * *
//   * * * * * * *
//     * * * * *
//       * * *
//         *
//         *
//       * * *
