//Produt Form 

let loadData = () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let rows = "";

    products.forEach(ele => {
        rows += `
        <tr>
            <td>${ele.id}</td>
            <td><img src="${ele.url}" width="60"></td>
            <td>${ele.name}</td>
            <td>${ele.price}</td>
            <td>${ele.stock}</td>
            <td>${ele.offer}</td>
            <td>
                <button onclick="setSelectedPro(${ele.id})">Update</button>
                <button onclick="deletePro(${ele.id})">Delete</button>
            </td>
        </tr>`;
    });

    document.querySelector("#tableBody").innerHTML = rows;
};



let setSelectedPro = (id) => {
    let products = JSON.parse(localStorage.getItem("products"));
    let p = products.find(ele => ele.id === id);

    document.getElementById("url").value = p.url;
    document.getElementById("PName").value = p.name;
    document.getElementById("price").value = p.price;
    document.getElementById("stock").value = p.stock;
    document.getElementById("offer").value = p.offer;
    document.getElementById("pid").value = p.id;


    document.querySelector("#updateBtn").style.display = "block"
    document.querySelector(".pbtn").style.display = "none"
};


let updateForm = () => {

    let pid = Number(document.getElementById("pid").value);

    let products = JSON.parse(localStorage.getItem("products"));

    let updatedProducts = products.map((ele) => {
        if (ele.id === pid) {
            return {
                id: pid, // SAME ID
                url: document.getElementById("url").value,
                name: document.getElementById("PName").value,
                price: document.getElementById("price").value,
                stock: document.getElementById("stock").value,
                offer: document.getElementById("offer").value
            };
        } else {
            return ele; // keep others unchanged
        }
    });

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // reset UI
    document.querySelector("form").reset();
    document.querySelector("#updateBtn").style.display = "none";
    document.querySelector(".pbtn").style.display = "block";

    loadData();
};


let deletePro = (id) => {
    let c = confirm("Do you want to Delete Product?");

    if (c) {
        let products = JSON.parse(localStorage.getItem("products"));

        let fpl = products.filter((ele) => ele.id !== id);

        localStorage.setItem("products", JSON.stringify(fpl));
        loadData();
    } else {
        alert("Your product is Safe");
    }
};


let sub = (ev) => {
    ev.preventDefault();


    let isvalid = true;
    let arrid = ["url", "PName", "price", "stock", "offer"];
    let arrerr = ["urlerror", "nameerror", "Priceerror", "Stockerror", "Offerror"];

    // Validation
    for (let i = 0; i < arrid.length; i++) {
        let input = document.getElementById(arrid[i]);
        let error = document.getElementById(arrerr[i]);

        if (input.value === "") {
            error.innerText = "Please fill the " + arrid[i];
            error.style.color = "red";
            input.style.border = "1px solid red";
            isvalid = false;
        } else {
            error.innerText = "";
            input.style.border = "1px solid";
        }
    }

    if (!isvalid) return;


    let product = {
        id: Date.now(),
        url: document.getElementById("url").value,
        name: document.getElementById("PName").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        offer: document.getElementById("offer").value
    };

    let products;

    if (localStorage.getItem("products") === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem("products"));
    }

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    loadData();
};




//SetTimeout
// debugger;
let showtime = () => {
    // debugger;
    let date = new Date()
    // console.log(date);

    let hr1 = document.querySelector("#timehr")
    let min1 = document.querySelector("#timemin")
    let sec1 = document.querySelector("#timesec")
    let ampm1 = document.getElementById("ampm")

    let min = date.getMinutes()
    let sec = date.getSeconds()

    let hr = date.getHours()
    let ampm = hr >= "12" ? "PM" : "AM";

    hr = Number(hr) % 12;
    hr = hr === 0 ? 12 : hr;

    hr1.innerHTML = hr
    min1.innerHTML = min
    sec1.innerHTML = sec
    ampm1.innerHTML = ampm

    // console.log(hr1, min1, sec1, ampm1)
}

showtime()

setInterval(() => {
    showtime()
}, 1000);




//customer page
let customers = JSON.parse(localStorage.getItem("customers")) || [];

let tableBody = document.getElementById("customerTable");

tableBody.innerHTML = "";

customers.forEach((cust, index) => {
    let row = `
        <tr>
            <td>${index + 1}</td>
            <td>${cust.name}</td>
            <td>${cust.email}</td>
        </tr>
    `;
    tableBody.innerHTML += row;
});


//logout
function logout(){
    let confirmLogout = confirm("Do you want to logout?");

    if (confirmLogout) {
        alert("Logged out successfully");
        window.location.href = "index.html"; 
    }
    else{
        alert("you are Login remains")
    }
}

window.onload = function () {
    loadData();
};