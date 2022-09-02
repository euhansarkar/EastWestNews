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
            <a class="fs-6 text-dark" onclick="loadOpenCatagory('${catagory.category_id}')">${catagory.category_name}</a>
        `
        getCatagories.appendChild(createDiv);
    })
}

const loadOpenCatagory = async(catagoryId = `01`) => {
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
            <div class="card mb-3 mx-auto p-3" style="width: 1000px">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${catagoryItem.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${catagoryItem.title}</h5>
                    <p class="card-text">${catagoryItem.details.slice(0, 200)}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div class="author d-flex">
                            <div class="author-img" style="margin-right: 15px"><img src="${catagoryItem.author.img}" class="img-fluid rounded" alt""></div>
                            <div>
                                <p style="font-size: 13px; font-weight: 600; margin: 0">${catagoryItem.author.name}</p>
                                <p style="font-size: 12px; font-weight: 500; margin: 0">${catagoryItem.author.published_date}</p>
                            </div>
                        </div>
                        <div class=""><i class="fa-solid fa-eye"></i>  ${catagoryItem.total_view}</div>
                        <div class="">rating: ${catagoryItem.rating.number}</div>
                        <div class="bg-dark text-light rounded p-1">
                            <a>show more <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `
        getCatagoriesItemsContainer.appendChild(createNewDiv);
    })
}

loadCatagories();
loadOpenCatagory();