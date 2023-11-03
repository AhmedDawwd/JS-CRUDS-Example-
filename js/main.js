let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('texes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let submit = document.getElementById('submit');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let table = document.getElementById('table');
let mode = 'create';
let idPro;

// console.log(title,price,taxes,ads,discount,total,table,category,category,create,
//     search,searchCategory,searchTitle)
// get total
function getTotal(){
    // let result = 0;
    if(price.value !='' ){
       let result = ((+price?.value || '') +  (+taxes?.value || '') + (+ads?.value || '')) - (+discount?.value || '');
        total.innerHTML = result;
        total.style.backgroundColor= '#040';
    }else{
        total.style.backgroundColor= '#a00d02';
    }
}
// create product
let dataPro;
if(localStorage.products != null){
    dataPro = JSON.parse(localStorage.products)
}else {
    dataPro = [];
}
submit.onclick = function(){
    if(title.value !='' && price.value != '' && category.value != ''&& +count.value <= 100){
        if(mode == 'create'){
        
                let newPro =  {
                    title: title.value.toLowerCase(),
                    price: price.value,
                    taxes:taxes.value,
                    ads:ads.value,
                    discount:discount.value,
                    total:total.innerHTML,
                    count:count?.value || '1',
                    category:category.value.toLowerCase()
                }
                if(newPro.count > 1){
                    for (let index = 0; index < newPro.count; index++) {
                        dataPro.push(newPro);        
                    }
                }else{
                    dataPro.push(newPro);
                }
                localStorage.setItem('products', JSON.stringify(dataPro));       
            
        }else{
            let upPro =  {
                title: title.value.toLowerCase(),
                price: price.value,
                taxes:taxes.value,
                ads:ads.value,
                discount:discount.value,
                total:total.innerHTML,
                count: dataPro[idPro].count,
                category:category.value.toLowerCase()
            }

            dataPro[idPro] = upPro;
            localStorage.products = JSON.stringify(dataPro);
            count.style.display = 'block';
            submit.innerHTML = 'create';
            mode = 'create';
            idPro = 0;

        }
        clearData();
    }

    
    showData();
}
// clear data
function clearData(){
    title.value ='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value = '';
    total.innerHTML= '';
    count.value ='';
    category.value = '';
}
// read data 
function showData(){
    getTotal();
    let tableData = '';
    for (let index = 0; index < dataPro.length; index++) {
        tableData += `
            <tr>
                <td>${index + 1}</td>
                <td>${dataPro[index].title}</td>
                <td>${dataPro[index].price}</td>
                <td>${dataPro[index].taxes}</td>
                <td>${dataPro[index].ads}</td>
                <td>${dataPro[index].discount}</td>
                <td>${dataPro[index].total}</td>
                <td>${dataPro[index].count}</td>
                <td>${dataPro[index].category}</td>
                <td><div class="tools"><button onClick="updateData(${index})" id="update" class="hideBtn" >Update</button>
                <button onClick="deleteData(${index})" id="delete" class="hideBtn" >Delete</button></div></td>
            </tr>
        `;

    }
    document.getElementById('tbody').innerHTML = tableData;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length >0 ){
        btnDelete.innerHTML = `
        <button onClick="deleteAll()" >Delete All (${dataPro.length}) </button>
        `;
    }else{
        btnDelete.innerHTML = '';
    }
}
showData();

// delete 
function deleteData(index){
    dataPro.splice(index,1);
    localStorage.products =  JSON.stringify(dataPro);
    showData(); 
}
// delete all
function deleteAll(){
    // dataPro = [];
    // localStorage.products =  JSON.stringify(dataPro);
    dataPro.splice(0);
    localStorage.clear();
    showData(); 
}
// update 
function updateData(index){
    let product = dataPro[index];
    title.value = product.title;
    price.value = product.price;
    taxes.value = product.taxes;
    ads.value = product.ads;
    discount.value = product.discount;
    category.value = product.category;
    // total.innerHTML = product.total
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mode = 'update';
    idPro =index;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// search 
let searchMode = 'title';
function getSearchMode(id){
    if(id == 'searchTitle'){
        searchMode = 'title';
    }else{
        searchMode = 'category';
    }
    search.ariaPlaceholder = 'Search By ' + searchMode;
    search.focus();
    search.value ='';
    showData();
}

function searchData(value){
    let listSearch = '';

    for (let index = 0; index < dataPro.length; index++) {
        if(searchMode == 'title'){
            if( dataPro[index].title.includes(value.toLowerCase())){
                // listSearch += dataPro[index];
                
                listSearch += `
                    <tr>
                        <td>${index}</td>
                        <td>${dataPro[index].title}</td>
                        <td>${dataPro[index].price}</td>
                        <td>${dataPro[index].taxes}</td>
                        <td>${dataPro[index].ads}</td>
                        <td>${dataPro[index].discount}</td>
                        <td>${dataPro[index].total}</td>
                        <td>${dataPro[index].count}</td>
                        <td>${dataPro[index].category}</td>
                        <td><div class="tools"><button onClick="updateData(${index})" id="update" class="hideBtn" >Update</button>
                        <button onClick="deleteData(${index})" id="delete" class="hideBtn" >Delete</button></div></td>
                    </tr>
                `;
            
                
                
            }
        }else{
            if( dataPro[index].category.includes(value.toLowerCase())){
                // listSearch += dataPro[index];
                
                listSearch += `
                    <tr>
                        <td>${index}</td>
                        <td>${dataPro[index].title}</td>
                        <td>${dataPro[index].price}</td>
                        <td>${dataPro[index].taxes}</td>
                        <td>${dataPro[index].ads}</td>
                        <td>${dataPro[index].discount}</td>
                        <td>${dataPro[index].total}</td>
                        <td>${dataPro[index].count}</td>
                        <td>${dataPro[index].category}</td>
                        <td><div class="tools"><button onClick="updateData(${index})" id="update" class="hideBtn" >Update</button>
                        <button onClick="deleteData(${index})" id="delete" class="hideBtn" >Delete</button></div></td>
                    </tr>
                `;
            
                
                
            }
        }
        
    }



    document.getElementById('tbody').innerHTML = listSearch;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length >0 ){
        btnDelete.innerHTML = `
        <button onClick="deleteAll()" >Delete All (${dataPro.length}) </button>
        `;
    }else{
        btnDelete.innerHTML = '';
    }
}

// search.onkeyup = 
