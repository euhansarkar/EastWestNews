const loadCatagories = async() => {
    let url = `https://openapi.programming-hero.com/api/news/categories`;
    let res = await fetch(url);
    let data = await res.json();
    displayCatagories(data.data.news_category);
}

const displayCatagories = catagories => {
    let getCatagories = document.getElementById(`catagories-container`);
    catagories.forEach(catagory => {
        let createDiv = document.createElement(`div`);
        createDiv.classList.add(`col`);
        createDiv.innerHTML = `
            <a class="fs-6" onclick="loadOpenCatagory('${catagory.category_id}')">${catagory.category_name}</a>
        `
        getCatagories.appendChild(createDiv);
    })
}

const loadOpenCatagory = async(catagoryId) => {
    let url = `https://openapi.programming-hero.com/api/news/category/${catagoryId}`;
    let res = await fetch(url);
    let data = await res.json();
    displayOpenCatagory(data.data);
}

const displayOpenCatagory = async(catagoryDetails) => {
    let getCatagoriesItemsContainer = document.getElementById(`catagories-items-container`);
    getCatagoriesItemsContainer.innerHTML = ``;
    catagoryDetails.forEach(catagoryItem => {
        let createNewDiv = document.createElement(`div`);
        createNewDiv.classList.add(`col`);
        createNewDiv.innerHTML = `
            <div class="card mb-3 w-100 mx-5">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${catagoryItem.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${catagoryItem.title}</h5>
                    <p class="card-text">${catagoryItem.details.slice(0, 200)}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                </div>
            </div>
        `
        getCatagoriesItemsContainer.appendChild(createNewDiv);
    })
    console.log(catagoryDetails);
}

loadCatagories();