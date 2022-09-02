const loadCatagories = async() => {
    let url = `https://openapi.programming-hero.com/api/news/categories`;
    let res = await fetch(url);
    let data = await res.json();
    displayCatagories(data.data.news_category);
}

const displayCatagories = catagories => {
    let getCatagories = document.getElementById(`catagories-container`);
    catagories.forEach(catagory => {
        console.log(catagory);
    })
}

loadCatagories();