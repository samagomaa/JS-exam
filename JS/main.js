let allMovies = []

async function getmovie(statue = "trending/all/day"){
    let response = await fetch(`https://api.themoviedb.org/3/${statue}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    response = await response.json()
    allMovies = response.results
    displayMovies();
}

getmovie()

function displayMovies() {
    var cartona = ``
    for(let i = 0 ; i < (allMovies).length  ; i++){
        if(allMovies[i].title){
            cartona += `<div class="col-md-4 p-3">
            <div class="movie position-relative overflow-hidden ">
                <img class="w-100" src="https://image.tmdb.org/t/p/w500/${allMovies[i].poster_path}" >
                <div class="movie-layer position-absolute py-4 px-4">
                    <h2 class="px-2">${allMovies[i].title}</h2>
                    <p>${allMovies[i].overview}</p>
                        <p>Release Date <span> : ${allMovies[i].first_air_date}</span></p>
                        <div class="rate">
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star-half-stroke py-3 " style="color: #f0dc00;"></i>
                            <h4 class="rounded-5 text-center py-2">${(allMovies[i].vote_average).toFixed(1)}</h4>
                        </div>
                </div>
            </div>
        </div>`
        }else{
            cartona += `<div class="col-md-4 p-3">
            <div class="movie position-relative overflow-hidden ">
                <img class="w-100" src="https://image.tmdb.org/t/p/w500/${allMovies[i].poster_path}" >
                <div class="movie-layer position-absolute py-4 px-4">
                    <h2 class="px-2">${allMovies[i].name}</h2>
                    <p>${allMovies[i].overview}</p>
                        <p>Release Date <span> : ${allMovies[i].first_air_date}</span></p>
                        <div class="rate">
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star-half-stroke py-3 " style="color: #f0dc00;"></i>
                            <h4 class="rounded-5 text-center py-2">${(allMovies[i].vote_average).toFixed(1)}</h4>
                        </div>
                </div>
            </div>
        </div>`
        }
    }
    document.getElementById('rowDate').innerHTML = cartona
}

function closeSideNav() {
    let boxwidth = $(".sideNavMenu .navTab").outerWidth()
        $(".sideNavMenu").animate({left:-boxwidth} , 500)
        $(".openCloseIcon").addClass("fa-align-justify")
        $(".openCloseIcon").removeClass("fa-x")
        $(".links li").animate({top:300} , 500)
}

closeSideNav()

function openSideNav(){
    $(".sideNavMenu").animate({left:0} , 500)
    $(".openCloseIcon").removeClass("fa-align-justify");
    $(".openCloseIcon").addClass("fa-x")
    for(i=0 ; i<6 ; i++){
        $(".links li").eq(i).animate({top:0} , (i+5)*100)
    }
}

$(".sideNavMenu i.openCloseIcon").click(()=>{
    if($(".sideNavMenu").css("left") == "0px"){
    closeSideNav()
    }else{
        openSideNav()
    }
    
})

let searchResults = []

async function searchMovie(term) {
    let response = await fetch(`https://api.themoviedb.org/3/search/collection?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${term}`)
    response = await response.json()
    searchResults = response.results
    console.log(searchResults);
    searchResults ?  showResults(searchResults) : showResults([]);
}

function showResults(term) {
    var cartona = ``
    for(let i = 0 ; i < term.length  ; i++){
        cartona += `<div class="col-md-4 p-3">
        <div class="movie position-relative overflow-hidden ">
            <img class="w-100" src="https://image.tmdb.org/t/p/w500/${term[i].poster_path}" >
            <div class="movie-layer position-absolute py-4 px-4">
                <h2 class="px-2">${term[i].name}</h2>
                <p>${term[i].overview}</p>
                    <p>Release Date <span> : ${term[i].first_air_date}</span></p>
                    <div class="rate">
                        <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                        <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                        <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                        <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                        <i class="fa-solid fa-star-half-stroke py-3 " style="color: #f0dc00;"></i>
                        <h4 class="rounded-5 text-center py-2">${(term[i].vote_average)}</h4>
                    </div>
            </div>
        </div>
    </div>`
    }
    document.getElementById('rowDate').innerHTML = cartona
}

