function excluir(name){
    window.localStorage.removeItem(name);
  }
  function getLists(){
    for ( var i = 0, len = (localStorage.length); i < len; ++i ) {
      let playlist = localStorage.getItem(localStorage.key( i ) );
      let response = JSON.parse(playlist);
      if(!response['buster']){
        var list1 = '';
        var list2 = '';
        response['tracks']['hits'].forEach(element => {
          list1 = list1 + `
          <div id="music${element['track']['key']}" class="d-flex justify-content-between pt-15 pb-15" style="border-bottom: 1px solid #e0e0e0;">
              <div class="d-flex">
                  <div>
                      <h5 class="card-title ml-15">${element['track']['title']}</h5>
                      <p class="card-text ml-15">${element['track']['subtitle']}</p>
                  </div>
              </div>
          </div>
          `
          
        });
        response['artists']['hits'].forEach(element => {
          list2 = list2 + `
          <div id="music${element['artist']['adamid']}" class="d-flex justify-content-between pt-15 pb-15" style="border-bottom: 1px solid #e0e0e0;">
              <div class="d-flex">
                  <img width="50" height="50" src="${element['artist']['avatar']}" alt="" style="border-radius: 50%;">
                  <div>
                      <h5 class="card-title ml-15">${element['artist']['name']}</h5>
                  </div>
              </div>
              <a class="btn_01 mr-15" href="${element['artist']['weburl']}" target="_blank">Ouvir</a>
          </div>
          `
          
        });
        $('#content-history').prepend(`
        <div class="col-xxl-10 col-xl-9 col-lg-9 col-md-11 col-sm-12">
          <div id="content" class="container mb-25">
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <div><span id="city">${response['infos']['cidade']}</span><span> - </span><span id="temp">${response['infos']['temperatura']}°</span><span> - </span><span id="date"><i>${response['infos']['date']}</i></span></div>
                <div><span><strong>${response['infos']['genero']}</strong></span><a href="#" onclick="excluir('${localStorage.key( i )}')" class="btn btn-danger p-3 ml-15" style="border-radius: 10px;"><i class="fa-solid fa-trash"></i>Excluir</a></div>
              </div>
              <div class="card-body style-1" style="overflow-y: scroll; height:400px;">
                <h4><strong>Top Artistas</strong></h4>
                ${list2}
                <h4><strong>Top Músicas</strong></h4>
                ${list1}
              </div>
            </div>
          </div>
        </div>
        `);
      }
      
    }
  }
  function getWeather(cidade){
    const d = new Date();
    let date = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`

    $.ajax({
      url: `https://api.openweathermap.org/geo/1.0/direct?q=${cidade},br&limit=1&appid=715126b909f484439d3f78d1fcf56b87`,
      type: "GET",
      cache: false,
      success: function(data){
        try{
          cidade = data[0]['name'];
          lon = data[0]['lon'];
          lat = data[0]['lat'];
          if(lon && lat){
            $("#error-text").html('');
            lat = `${lat}`.replace('.', ',');
            lon = `${lon}`.replace('.', ',');
            $.ajax({
              url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=715126b909f484439d3f78d1fcf56b87&units=metric&lang=pt`,
              type: "GET",
              cache: false,
              success: function(data){
                var temperatura = data['main']['temp'];
                if(temperatura >=32 ){
                  var genero = 'Rock';
                }
                else if(temperatura >=24 && temperatura < 32 ){
                  var genero = 'Pop';
                }
                else if(temperatura >=16 && temperatura < 24 ){
                  var genero = 'Classica';
                }
                else{
                  var genero = 'Lofi';
                }
                var settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://shazam.p.rapidapi.com/search?term=${genero}&locale=pt-BR&offset=0&limit=20`,
                "method": "GET",
                "headers": {
                  "X-RapidAPI-Key": "b29465bfa4msh5f6555b5bd1ec9ap15f3d2jsnb9e2b207de1e",
                  "X-RapidAPI-Host": "shazam.p.rapidapi.com"
                }
              };

              $.ajax(settings).done(function (response) {
                
                var list1 = '';
                var list2 = '';
                response['tracks']['hits'].forEach(element => {
                  list1 = list1 + `
                  <div id="music${element['track']['key']}" class="d-flex justify-content-between pt-15 pb-15" style="border-bottom: 1px solid #e0e0e0;">
                      <div class="d-flex">
                          <div>
                              <h5 class="card-title ml-15">${element['track']['title']}</h5>
                              <p class="card-text ml-15">${element['track']['subtitle']}</p>
                          </div>
                      </div>
                  </div>
                  `
                  
                });
                response['artists']['hits'].forEach(element => {
                  list2 = list2 + `
                  <div id="music${element['artist']['adamid']}" class="d-flex justify-content-between pt-15 pb-15" style="border-bottom: 1px solid #e0e0e0;">
                      <div class="d-flex">
                          <img width="50" height="50" src="${element['artist']['avatar']}" alt="" style="border-radius: 50%;">
                          <div>
                              <h5 class="card-title ml-15">${element['artist']['name']}</h5>
                          </div>
                      </div>
                      <a class="btn_01 mr-15" href="${element['artist']['weburl']}" target="_blank">Ouvir</a>
                  </div>
                  `
                  
                });
                $('#hero-image').html('');
                $('#content').html(`
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                      <div><span id="city">${cidade}</span><span> - </span><span id="temp">${temperatura}°</span></div>
                      <div><span>Com esse clima, recomendamos <strong>${genero}</strong></span></div>
                    </div>
                    <div class="card-body style-1" style="overflow-y: scroll; height:400px;">
                      <h4><strong>Top Artistas</strong></h4>
                      ${list2}
                      <h4><strong>Top Músicas</strong></h4>
                      ${list1}
                    </div>
                </div>
                `);
                window.location.href = '#content';
                var lista = response;
                lista.infos = {'cidade':cidade, 'temperatura':temperatura, 'genero':genero, 'date': date};

                localStorage.setItem(`response${date}`, JSON.stringify(lista));
              });
              }
            });
          }
        }
        catch{
          $("#error-text").html('Cidade não encontrada, verifique ortografia.');
        }
        
      },
      error: function (jqXHR, exception) {
        $("#error-text").html('Cidade não encontrada, verifique ortografia.');
      },
    });
  }