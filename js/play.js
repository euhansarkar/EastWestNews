
const loadUser = async() => {
    try{
        let url = `https://randomuser.me/api/?gender=female`;
        let res = await fetch(url);
        let data = await res.json();
        displayUser(data.results[0].picture.medium);
    }catch(err){
        console.log(err);
    }
}

const displayUser = data => {
    let getUserId = document.getElementById(`user`);
    getUserId.setAttribute(`src`, `${data}`);
}

loadUser();

const loadCatagories = async() => {
    try{
        let url = `https://openapi.programming-hero.com/api/news/categories`;
        let res = await fetch(url);
        let data = await res.json();
        displayCatagories(data.data.news_category);
    }catch(err){
        console.log(err);
    }
}

const displayCatagories = catagories => {
    let getCatagories = document.getElementById(`catagories-container`);
    catagories.forEach(catagory => {
        let createDiv = document.createElement(`div`);
        createDiv.classList.add(`col`);
        createDiv.classList.add(`col-6`);
        createDiv.classList.add(`col-md-1`);
        createDiv.innerHTML = `
            <a class="fs-6 text-dark" onclick="loadOpenCatagory('${catagory.category_id}', '${catagory.category_name}')">${catagory.category_name}</a>
        `
        getCatagories.appendChild(createDiv);
    })
}

const loadOpenCatagory = async(catagoryId = `01`, catagoryName = `Breaking News`) => {
    // spinner start 
    spinnerLoader(true);
    try{
        let url = `https://openapi.programming-hero.com/api/news/category/${catagoryId}`;
        let res = await fetch(url);
        let data = await res.json();
        displayOpenCatagory(data.data, catagoryName);
    }catch(err){
        console.log(err);
    }
}

const displayOpenCatagory = async(catagoryDetails, catagoryName) => {
    //default sorted by view 
    catagoryDetails.sort(((cat1, cat2) => cat2.total_view - cat1.total_view));
    //found items 
    try{
        let getItemsFounded = document.getElementById(`items-founded`);
        getItemsFounded.innerHTML = ``;
        let createFoundDiv = document.createElement(`div`);
        createFoundDiv.classList.add(`col`);
        createFoundDiv.innerHTML = `
            <h4 class="text-dark shadow-lg p-3 mb-5 bg-body text-center text-md-left rounded mx-auto" style="max-width: 1000px">${catagoryDetails.length} items found for category "${catagoryName}"</h4>
        `
        getItemsFounded.appendChild(createFoundDiv);
    }catch(err){
        console.log(err);
    }

    // no data found massage
    try{
        let getNoDataFound = document.getElementById(`data-not-found`);
    if(catagoryDetails.length === 0){
        getNoDataFound.classList.remove(`d-none`);
    }else{
        getNoDataFound.classList.add(`d-none`);
    }
    
    let getCatagoriesItemsContainer = document.getElementById(`catagories-items-container`);
    getCatagoriesItemsContainer.innerHTML = ``;
    catagoryDetails.forEach(catagoryItem => {
        let createNewDiv = document.createElement(`div`);
        createNewDiv.classList.add(`col`);
        createNewDiv.innerHTML = `
            <div class="card mb-3 mx-auto p-3" style="max-width: 1000px">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${catagoryItem.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${catagoryItem.title}</h5>
                    <p class="card-text">${catagoryItem.details.length > 200 ? catagoryItem.details.slice(0, 200).concat(`....`) : catagoryItem.details}</p>
                    <div class="d-flex row justify-content-between align-items-center mt-3">
                        <div class="author col-8 col-md-4 col-sm-4 my-1 d-flex">
                        <div class="author-img" style="margin-right: 15px"><img src="${catagoryItem.author.img}" class="img-fluid rounded" alt""></div>
                        <div>
                            <p style="font-size: 13px; font-weight: 600; margin: 0">${catagoryItem.author.name ? catagoryItem.author.name : `no data found`}</p>
                            <p class="" style="font-size: 12px; font-weight: 500; margin: 0">${catagoryItem.author.published_date ? catagoryItem.author.published_date : `no data found`}</p>
                        </div>
                    </div>
                    <div class="col-4 col-md-2 mb-1 col-sm-4 my-1"><i class="fa-solid fa-eye"></i>  ${catagoryItem.total_view ? catagoryItem.total_view : `no data found`}</div>
                    <div class="col-6 col-md-3 my-1 d-none d-md-block">rating: ${catagoryItem.rating.number}</div>
                    <div class="bg-dark text-md-center text-light rounded p-1 col-auto my-1 col-md-3 col-sm-3">
                        <!-- Button trigger modal -->
                        <a type="button" onclick="loadShowDetails('${catagoryItem._id}')" data-bs-toggle="modal" data-bs-target="#showDetailsModal">show more <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `
        getCatagoriesItemsContainer.appendChild(createNewDiv);
    })
    }catch(err){
        console.log(err);
    }
    // spinner end 
    spinnerLoader(false);
}


const loadShowDetails = async(showId) => {
    try{
        let url = `https://openapi.programming-hero.com/api/news/${showId}`;
        let res = await fetch(url);
        let data = await res.json();
        displayShowDetails(data.data[0]);
    }catch(err){
        console.log(err);
    }
}

const displayShowDetails = showDetails => {
    let modalTitle = document.getElementById(`showDetailsModalLabel`);
    modalTitle.innerText = showDetails.title;
    let modalBody = document.getElementById(`modal-body`);
    modalBody.innerHTML = `
        <div class="d-flex align-items-center">
            <div>
                <img src="${showDetails.author.img}" alt"">
            </div>
            <div class="ms-3">
                <h4>author: ${showDetails.author.name ? showDetails.author.name : `no data found`}</h4>
                <h5>blog published: ${showDetails.author.published_date ? showDetails.author.published_date : `no data found`}</h5>
                <div>
                    <i class="fa-solid fa-eye"></i>  ${showDetails.total_view ? showDetails.total_view : `no data found`}    
                </div>
            </div>
        </div>
        <div class="modal-content">
            <p>${showDetails.details}</p>
        </div>
    `
}


// spinner 

const spinnerLoader = isLoading => {
    try{
        let getSpinner = document.getElementById(`spinner`);
        if(isLoading){
            getSpinner.classList.remove(`d-none`);
        }else{
            getSpinner.classList.add(`d-none`);
        }
    }catch(err){
        console.log(err);
    }
}


loadCatagories();
loadOpenCatagory();
