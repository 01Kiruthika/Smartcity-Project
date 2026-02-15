//Produt Form 
let arr = []
let sub = (ev) => {
    // debugger;
    //  alert("Hello")
    ev.preventDefault()
    let oj = {}
    let isvalid = true
    let arrid = ["url", "PName", "price", "stock", "offer"];
    let arrerr = ["urlerror", "nameerror", "Priceerror", "Stockerror", "Offerror"];
    for (let i = 0; i < arrid.length; i++) {
        let inid = document.getElementById(arrid[i])
        let inerr = document.getElementById(arrerr[i])
        let vl = inid.value

        if (vl === "") {
            inerr.innerText = "Please fill the " + arrid[i] + " box"
            inerr.style.color = "red"
            inid.style.border = "1px solid red"
            isvalid = false

        } else {

            inid.style.border = "1px solid"
            inerr.innerText = ""
            oj[arrid[i]] = inid.value
        }
    }

    if (isvalid) {
        arr.push(oj)
    }

    console.log(arr)


    debugger;
    let URL = document.getElementById("url").value
    let NAME = document.getElementById("PName").value
    let PRICE = document.getElementById("price").value
    let STOCK = document.getElementById("stock").value
    let OFFER = document.getElementById("offer").value

    let product = {
        url: URL,
        name: NAME,
        price: PRICE,
        stock: STOCK,
        offer: OFFER
    };


    let localdata = localStorage.setItem("product", JSON.stringify(product));
    console.log(localdata);





}