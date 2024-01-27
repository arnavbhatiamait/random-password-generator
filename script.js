const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+=:;<=>?@#$%^{}[];\|:",.<>/?';
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set circle div color to grey 
setIndicator("#fff");
console.log("hi");

//* set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.textContent = passwordLength;
    //? or kuch karna chaiye
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min))+"%100%";
}
// setIndicator();
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    // shadow
    indicator.style.boxShadow = ("6px 12px ", color);
    // indicator.style.boxShadow='0px 0px 12px 1px ${color}';
}
function getRandInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
    console.log(getRandInteger(0, 9));
    return getRandInteger(0, 9);
}
function generateLowerCase() {
    console.log(String.fromCharCode(getRandInteger(97, 123)));
   return String.fromCharCode(getRandInteger(97, 123));
}
function generateUpperCase() {
    console.log(String.fromCharCode(getRandInteger(65, 91)));
   return String.fromCharCode(getRandInteger(65, 91));
}
function generateSymbol() {
    const randNum = getRandInteger(0, symbols.length);
    console.log(symbols.charAt(randNum));
    return symbols.charAt(randNum);
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch (e) {
        copyMsg.innerText = "failed";
    }
    //!to make copy wala msg visable 
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}
function shufflePassword(array) {
    //!Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    console.log(str);
    return str;
}
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });
    //*special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});
generateBtn.addEventListener('click', () => {
    console.log('generatebtn');
    //*none of the checkboxes are checked
    if (checkCount <= 0) {
        console.log(checkCount);
        return;
    }
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
        console.log(checkCount);
    }
    //*lets start the journey to find new password
    //*remove old password
    password = "";
    // console.log(password);
    // //put stuff of checkboxes
    // if (uppercaseCheck.checked){
    //     password+=generateUpperCase();
    // }
    // if (lowercaseCheck.checked){
    //     password+=generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumbers();
    // }
    // if (symbolsCheck.checked){
    //     password+=generateSymbols();
    // }
    let funcArr = [];
    if (uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    if (lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    if (numbersCheck.checked)
        funcArr.push(generateRandomNumber);
    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);
    console.log(funcArr.length);
    //! compulsary addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
        console.log(Array.from(password));
    }
    // console.log("hi");
    console.log(passwordLength);
    //* reaminning addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        console.log(i);
        let randIndex = getRandInteger(0, funcArr.length);
        console.log('randIndex', randIndex);
        password += funcArr[randIndex]();
        // console.log(password);
        console.log(Array.from(password));

    }
    console.log(Array.from(password));

    //* shuffle th passwords
    password = shufflePassword(Array.from(password));
    console.log('hiiiii');
    // console.log(password);
    //*show in UI
    passwordDisplay.value = password;
    // console.log(passwordDisplay.value,"done");

    //? calculate strength
    calcStrength();


});

