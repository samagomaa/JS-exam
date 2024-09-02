$(document).ready(function(){
    getmovie()
    let boxwidth = $(".sideNavMenu .navTab").outerWidth()
    $(".sideNavMenu").animate({left:`-${boxwidth}px`} , 200)
    $(".loadingScreen").fadeOut(1000)
})


let allMovies = []

async function getmovie(statue = "trending/all/day"){
    let response = await fetch(`https://api.themoviedb.org/3/${statue}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    response = await response.json()
    allMovies = response.results
    displayMovies();
}

function displayMovies() {
    var cartona = ``
    for(let i = 0 ; i < (allMovies).length  ; i++){
        if(allMovies[i].poster_path != null){
            cartona += `<div class="col-md-4">
            <div movieId="${allMovies[i].id}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="movie position-relative overflow-hidden">
                <img class="w-100" src="https://image.tmdb.org/t/p/w500/${allMovies[i].poster_path}"  >
                <div class="movie-layer position-absolute">
                <div class="p-4">
                <div class="text-center">
                <h2 class="px-2">${allMovies[i].name||allMovies[i].title}</h2>
                </div>
                <div>
                <p>${allMovies[i].overview.split(/\s+/).slice(0, 30).join(" ") + " ..."}</p>
                </div>
                <div>
                <p>Release Date <span> : ${allMovies[i].first_air_date||allMovies[i].release_date}</span></p>
                </div>
                <div>
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                            <i class="fa-solid fa-star-half-stroke py-3 " style="color: #f0dc00;"></i>
                </div>
                <div class="rate">
                <h4 class="rounded-circle text-center py-2">${(allMovies[i].vote_average).toFixed(1)}</h4>
                </div>
                </div>
                </div>
            </div>
        </div>`
        }
    }
    document.getElementById('rowDate').innerHTML = cartona
    getmovieId()
}


function getmovieId(){
    let movieList = document.querySelectorAll(".movie")
        movieList.forEach((el)=>{
            el.addEventListener("click",function(){
                let id = this.getAttribute("movieId")
                getmovieDetails(id)
                console.log("herreee");
                
            })
        })
}

function getmovieDetails(id){
    allMovies.forEach((el)=>{
        if(el.id == id){
            displayMovieModal(el)
            }
        
    })
}

function displayMovieModal(x){
    console.log(x);
    let cartona = ``
        cartona += `<div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${x.title||x.name}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row g-4">
                <div class="col-md-6">
                    <div>
                       <img class="w-100" src="https://image.tmdb.org/t/p/w500/${x.poster_path}"  >
                    </div>
                </div>
                <div class="col-md-6">
                    <div>
                        <p>Release Date :<span> ${x.first_air_date||x.release_date}</span></p>
                        </div>
                        <div>
                                    <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                                    <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                                    <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                                    <i class="fa-solid fa-star py-3" style="color: #f0dc00;"></i>
                                    <i class="fa-solid fa-star-half-stroke py-3 " style="color: #f0dc00;"></i>
                        </div>
                        <div class="rate">
                        <h4 class="rounded-circle text-center py-2">${(x.vote_average).toFixed(1)}</h4>
                        </div>
                </div>
                <div class="col-md-12">
                    <div>
                        <p>${x.overview}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>`
                document.getElementById('movieModal').innerHTML = cartona
}


function closeSideNav() {
    let boxwidth = $(".sideNavMenu .navTab").outerWidth()
        $(".sideNavMenu").animate({left:`-${boxwidth}px`} , 500)
        $(".CloseIcon").addClass("fa-align-justify")
        $(".CloseIcon").removeClass("fa-x")
        $(".links li").animate({top:300} , 500)
}

function openSideNav(){
    $(".sideNavMenu").animate({left:"0px"} , 500)
    $(".CloseIcon").removeClass("fa-align-justify");
    $(".CloseIcon").addClass("fa-x")
    for(i=0 ; i<6 ; i++){
        $(".links li").eq(i).animate({top:0} , (i+5)*100)
    }
}

$(".sideNavMenu i.CloseIcon").click(()=>{
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
    searchResults ?  showResults(searchResults) : showResults([]);
}

function showResults(term) {
    var cartona = ``
    if (term.length == 0) {
        getmovie()
    }else{
        for(let i = 0 ; i < term.length  ; i++){
            if(term[i].poster_path != null){
                cartona += `<div class="col-md-4">
            <div movieId="${term[i].id}" class="movie position-relative overflow-hidden">
                <img class="w-100" src="https://image.tmdb.org/t/p/w500/${term[i].poster_path}"  >
                <div class="movie-layer position-absolute">
                <div class="p-4">
                <div class="text-center">
                <h2 class="px-2">${term[i].name||term[i].title}</h2>
                </div>
                <div>
                <p>${term[i].overview}</p>
                </div>
                </div>
                </div>
            </div>
        </div>`
            }
            
        }
    }
    document.getElementById('rowDate').innerHTML = cartona
}

