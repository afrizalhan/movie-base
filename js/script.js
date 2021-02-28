function searchMovie() {
    $('#movie-list').html('');
    $.ajax({
        url : 'https://omdbapi.com',
        type : 'get',
        dataType : 'json',
        data : {
            'apikey' : '9962986d',
            's' : $('#search-input').val()
        },
        success : function (result) {
            if (result.Response == 'True') {
                let movies = result.Search;
                $.each(movies, function (i,data) {
                   $('#movie-list').append(`
                   <div class="col-md-3 col-sm-4">
                        <div class="card mb-3">
                            <img class="card-img-top" src="`+data.Poster+`" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">`+data.Title+`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID+`">See Detail</a>
                            </div>
                        </div>
                   </div>
                   `)
                });
            } else {
                $('#movie-list').html('<div class="alert alert-danger" role="alert">Movie not Found!</div>')
            }
        }
    })
}

$('#btn-search').on('click', function () {
    searchMovie();
})

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        searchMovie();
    }
})

$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url : 'https://omdbapi.com',
        dataType : 'json',
        type : 'get',
        data : {
            'apikey' : '9962986d',
            'i' : $(this).data('id')
        },
        success : function (movie) {
            if (movie.Response === 'True') {
                $('#exampleModalLabel').html(movie.Title);
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="`+movie.Poster+`" class="img-fluid mb-3 align-self-center">
                            </div>
                            <div class-"col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+movie.Title+`</h3></li>
                                    <li class="list-group-item">Release Date : `+movie.Released+`</li>
                                    <li class="list-group-item">Genre : `+movie.Genre+`</li>
                                    <li class="list-group-item">Director : `+movie.Director+`</li>
                                    <li class="list-group-item">Actors : `+movie.Actors+`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    })
})
