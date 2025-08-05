const URL_link = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const DropDown = document.querySelectorAll(".DropDown select")
let btn = document.querySelector("form button")
const amount  = document.querySelectorAll(".amount input");
const fromCurr = document.querySelector(".from select");
const ToCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg p");


for(let select of DropDown)
{
    for( i in countryList)
    {
        let newoption = document.createElement("option");
        newoption.innerText = i;
        newoption.value = i;
        if(select.name === "from" && i === "USD")
        {
            newoption.selected = "selected";
        }else if(select.name === "to" && i === "PKR")
        {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>
    
    {
        updateflag(evt.target);
    });
}

const updateflag = (element) =>
{
    let     currcode = element.value;
    let countrycode = countryList[currcode];
    let newScr = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newScr;
}


 btn.addEventListener("click",async (evt) =>
{
    
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal<1)
    {
        amountVal = 1;
        amount.value = "1";
    }
const URL_1 = `${URL_link}/${fromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`;
let response = await fetch(URL_1);
let data = await response.json();
let rate = data[ToCurr.value.toLowerCase()];
let final_amount  = rate*amountVal;
msg.innerText = `${amountVal} ${fromCurr.value} = ${final_amount.toFixed()} ${ToCurr.value}`;

});