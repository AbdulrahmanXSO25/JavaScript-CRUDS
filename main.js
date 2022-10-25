let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let btnDeleteAll = document.getElementById('deleteAll');
let mod = 'create';
let tmp;

function getTotal()
{
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#04984e';
    }
    else
    {
        total.innerHTML = '';
        total.style.backgroundColor = '#47B5FF';
    }
}

let dataProducts;

if (localStorage.Product != null)
{
    dataProducts = JSON.parse(localStorage.Product);
}
else
{
    dataProducts = [];
}

submit.onclick = function()
{
        let newProduct=
    {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    if (title.value != '' && price.value && category.value && newProduct.count < 100)
    {

        if (mod === 'create')
    {
        if (newProduct.count > 1)
    {
        for (let i = 0; i < newProduct.count; i++) {
            dataProducts.push(newProduct);
        }
    }
    else
    {
        dataProducts.push(newProduct);
    }
    }
    else
    {
        dataProducts [tmp] = newProduct;
        mod = 'create';
        submit.innerHTML = 'Submit';
        count.style.display = 'block';
        btnDeleteAll.style.display = 'block';
    }

        clearData();
    }

    localStorage.setItem('Product', JSON.stringify(dataProducts));
    
    showData();
}

function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}

function showData()
{
    let table = '';
    for (let i = 0; i < dataProducts.length; i++) {

        table +=
        `
        <tr>
            <td>${i+1}</td>
            <td>${dataProducts[i].title}</td>
            <td>${dataProducts[i].price}</td>
            <td>${dataProducts[i].taxes}</td>
            <td>${dataProducts[i].ads}</td>
            <td>${dataProducts[i].discount}</td>
            <td>${dataProducts[i].total}</td>
            <td>${dataProducts[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>
        `
        
    }

    document.getElementById('tBody').innerHTML = table;
    if (dataProducts.length > 0)
    {
        btnDeleteAll.innerHTML = `<button class="deleteBtn" onclick="deleteAll()">Delete All (${dataProducts.length})</button>`
    }
    else
    {
        btnDeleteAll.innerHTML = '';
    }

    total.style.backgroundColor = '#47B5FF';

}
showData();

function deleteProduct(i)
{
    dataProducts.splice(i,1);
    localStorage.Product = JSON.stringify(dataProducts);
    showData();
}
function deleteAll()
{
    localStorage.clear();
    dataProducts.splice(0);
    showData();
}

function updateProduct(i)
{
    title.value = dataProducts[i].title;
    price.value = dataProducts[i].price;
    taxes.value = dataProducts[i].taxes;
    ads.value = dataProducts[i].ads;
    discount.value = dataProducts[i].discount;
    category.value = dataProducts[i].category;

    getTotal();
    count.style.display = 'none';
    btnDeleteAll.style.display = 'none';
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mod = 'update';
    tmp = i;
    window.scrollTo({top: 0, behavior: 'smooth'});
}


let searchMode = 'Title';

function getSearchMode(id)
{

    let search = document.getElementById('search');

    if (id == 'searchTitle')
    {
        searchMode = 'Title';
    }
    else
    {
        searchMode = 'Category';
    }
    search.placeholder = 'Search By '+ searchMode;


    search.focus();
    search.value = '';
    showData();

}

function searchFunc(value)
{
    let table = '';
    for (let i = 0; i < dataProducts.length; i++) {
    if (searchMode == 'Title')
    {
            if (dataProducts[i].title.includes(value))
            {
                table +=
            `
            <tr>
                <td>${i+1}</td>
                <td class="searched">${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
            `
            }
    }
    
    else 
    {
            if (dataProducts[i].category.includes(value))
            {
                table +=
            `
            <tr>
                <td>${i+1}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
            `
            }
    }
}

    document.getElementById('tBody').innerHTML = table;
}