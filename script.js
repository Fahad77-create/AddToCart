const menBtn = document.querySelector('#menBtn')
const wMenBtn = document.querySelector('#womenBtn')
const allBtn = document.querySelector('#allBtn')
const menCards = document.querySelectorAll('#men')
const wMenCards = document.querySelectorAll('#wmen')

// for Men filter
menBtn.addEventListener('click', e => {
        menBtn.className = 'btn btn-secondary active filter-button btn'
    wMenBtn.className = 'btn btn-secondary  filter-button btn'
    allBtn.className = 'btn btn-primary filter-button all-btn'
    for (let i = 0; i < menCards.length; i++) {
        menCards[i].style.display = 'inline-block'
    }
    for (let i = 0; i < wMenCards.length; i++) {
        wMenCards[i].style.display = 'none'
    }
})

// for Women filter
wMenBtn.addEventListener('click', e => {
        menBtn.className = 'btn btn-secondary filter-button btn'
    wMenBtn.className = 'btn btn-secondary active filter-button btn'
    allBtn.className = 'btn btn-primary filter-button all-btn'
    for (let i = 0; i < menCards.length; i++) {
        menCards[i].style.display = 'none'
    }
    for (let i = 0; i < wMenCards.length; i++) {
        wMenCards[i].style.display = 'inline-block'
    }
})

// for display All
allBtn.addEventListener('click', e => {
    menBtn.className = 'btn btn-secondary filter-button btn'
    wMenBtn.className = 'btn btn-secondary  filter-button btn'
    allBtn.className = 'btn btn-primary active filter-button all-btn'
    for (let i = 0; i < menCards.length; i++) {
        menCards[i].style.display = 'inline-block'
    }
    for (let i = 0; i < wMenCards.length; i++) {
        wMenCards[i].style.display = 'inline-block'
    }
})

//===============For adding items to Cart ================


let productName = document.querySelectorAll("#name");
let pri = document.querySelectorAll("#cost");
let pics = document.querySelectorAll("#pic")
let cardBtn = document.querySelectorAll("#cart");
let Name=document.querySelector("#itemName")
let price=document.querySelector("#price");
let Img=document.querySelector("#img");
let quantity=document.querySelector("#num")
let cDetail=document.querySelector("#cartList")
let addCart=document.querySelector("#addCart")
const clearAll=document.querySelector("#clearAll")
let List=document.querySelector("#cartListBtn")
const Total=document.querySelector("#total")
const modal_footer=document.querySelector("#modal_foot")


for (let i = 0; i < cardBtn.length; i++) {
    cardBtn[i].addEventListener('click', e => {
        let itemNme=productName[i].innerText
        Name.innerText=itemNme
        let itemCost=pri[i].innerText
        price.innerText=itemCost
        let itemImg=pics[i].innerHTML;
        Img.innerHTML=itemImg;
    })
}

addCart.addEventListener('click',e=>{
        let info = {
            name: Name.innerText,
            price: price.innerText,
            Quantity: quantity.value,
        }

        let infoArr = [];
        if (sessionStorage.getItem('infoArr') === null) {
            infoArr.push(info)
            sessionStorage.setItem('infoArr', JSON.stringify(infoArr))
        }
        else {
            infoArr = JSON.parse(sessionStorage.getItem('infoArr'));
            infoArr.push(info);
            sessionStorage.setItem('infoArr', JSON.stringify(infoArr))
        }
        addCart.textContent="Added"
        setTimeout(() => {
            addCart.textContent="Add to Cart"
        }, 1500);
        List.style.display='block'
})

List.addEventListener('click', e=>{
infoArr = JSON.parse(sessionStorage.getItem('infoArr'));
for(let i=0; i<infoArr.length;i++){
    cDetail.innerHTML +=   
            '<div class="row" id="parent">' 
            + '<div class="col-5 col-sm-5 col-md-5" style="padding:0px;">' + '<hr style="width:100%;">' + '<h5 style="margin-left:1vw; text-decoration:none;">' + infoArr[i].name + '</h5>' + '</div>'
            + '<div class="col-3 col-sm-3 col-md-3" style="padding:0px;">' + '<hr style="width:100%;">' + '<hr style="width:100%;color:white; margin-bottom:0px;">' + '<h5 style="float:left;  margin-right:8vw; margin-top:0px;">' + 'Price' + '</h5>' + '<h4 id="price" style="float:left;  margin-right:7vw;">' + infoArr[i].price + '</h4>' + '</div>'
            + '<div class="col-3 col-sm-3 col-md-3" style="padding:0px;">' + '<hr style="width:100%;">' + '<hr style="width:100%;color:white; margin-bottom:0px;">' + '<h5 style="float:left;  margin-right:8vw; margin-top:0px;">' + 'Quantity' + '</h5>' 
            + '<h4>'+infoArr[i].Quantity+'</h4>'
            + '</div>'
            + '<div class="col-1 col-sm-1 col-md-1" style="padding:0px;">' + '<hr style="width:100%;">'
            +'<hr style="width:100%;color:white; margin-bottom:0px;">' 
            + '<button onClick="cross(this)" style="border:none; background:none;">' + '<i class="fa-solid fa-xmark" style="color:rgb(155, 3, 3);">' + '</i>' + '</button>' + '</div>'
            + '</div>'
            Total.textContent="Total"
}
})

// deleting item from list
function cross(elem,itemName) {
    elem.parentElement.parentElement.remove(elem);
   
// reset sessionStorage
    infoArr = JSON.parse(sessionStorage.getItem('infoArr'));
    for(let x=0;x<infoArr.length;x++){
        if(infoArr[x].name==elem.parentElement.parentElement.firstChild.innerText){
           infoArr.splice(x,1);
           break;
        }
    }
    sessionStorage.setItem('infoArr', JSON.stringify(infoArr))
    Total.textContent="Total"
}

// clear All item from list
clearAll.addEventListener('click',e =>{
    cDetail.innerHTML=" ";
    Total.textContent="Total"
    sessionStorage.clear()
    modal_footer.innerHTML=''
})

Total.addEventListener('click', e=>{
    infoArr = JSON.parse(sessionStorage.getItem('infoArr'));
    let totalCost=0;
    for(let i=0; i<infoArr.length; i++){
        let Cost=infoArr[i].price.replace('$','')
        let product=Cost * infoArr[i].Quantity
        totalCost+=product
    }
    modal_footer.innerHTML='<hr style="width:100%;color:blue; margin-bottom:0px;">' 
                           +'<div class="container"  style="padding: 0px;">'
                           +'<div class="row">'
                           +'<div class="col-6 col-md-6">'+'<h3 align="left">'+"Total: "+"$"+totalCost +'</h3>' +'</div>'
                           +'<div class="col-6 col-md-6">'+ "  " +'</div>'
                                   +'</div>'
                                    +'</div>';
    Total.textContent="Check Out";
    
})
