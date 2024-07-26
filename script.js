const baseUrl = "https://open.er-api.com/v6/latest";
let dropDown = document.querySelectorAll(".select-container select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let exchg = document.querySelector("#exchange-icon");

for(let select of dropDown)
{
    for(let currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        select.append(newOption);
        if(currCode == "USD" && select.name == "from")
        {
            newOption.selected = "selected";
        }
        else if(currCode == "INR" && select.name == "to")
        {
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

function updateFlag(selectTarget)
{
    let currCode = selectTarget.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let parentOfSelect = selectTarget.parentElement;
    let img = parentOfSelect.querySelector("img");
    img.src = newSrc;
}

async function getConvertedValue()
{
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    if(amtVal == "" || amtVal < 1)
    {
        amtVal = 1;
        amt.value = amtVal;
    }
    
    let fromCurrCode = fromCurr.value;
    let toCurrCode = toCurr.value;
    
    let URL = `${baseUrl}/${fromCurrCode}`;
    let response = await fetch(URL);
    let data = await response.json();
    let allRates = data["rates"];
    let askedRate = allRates[toCurrCode];

    let calcAmt = amtVal * askedRate;
    msg.innerText = `${amtVal} ${fromCurrCode} = ${calcAmt} ${toCurrCode}`;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    getConvertedValue();
})

window.addEventListener("load", ()=>{
    getConvertedValue();
})

exchg.addEventListener("click", ()=>{
    let fromCurrCode = fromCurr.value;
    let toCurrCode = toCurr.value;

    fromCurr.value = toCurrCode;
    updateFlag(fromCurr);
    toCurr.value = fromCurrCode;
    updateFlag(toCurr);
})


