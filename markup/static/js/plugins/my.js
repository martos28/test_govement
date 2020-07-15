
const btnShowSide = document.querySelector(".jsToggleMenu ");
const asideSelector = document.querySelector(".js_leftSide");
const btnBackHtml = document.querySelector(".js_html_back");
const results = document.querySelector('.my-slider');

function showMenu() {  
    asideSelector.classList.toggle('active');
}
btnShowSide.addEventListener("click", showMenu );

var slider = tns({
  container: '.my-slider',
  loop:false,
  nav:false,
  gutter:10,
  autoplay: false,
  responsive: {
    900: {
      items: 4,
      gutter:8,
    },
    1650: {
      items:6,
      gutter:10,
    }
  }
});

const backupHtml = results.innerHTML;
//console.log(backupHtml);
function htmlBack() {
  results.innerHTML = "";
  results.innerHTML = backupHtml;
  //slider.rebuild();
}
let summJson = 0;

btnBackHtml.addEventListener("click", htmlBack ); 
const getDataServ = function(url) {
  let r = new XMLHttpRequest();
  r.open("GET", url, false);
  r.send();
  if (r.status != 200) {
    //  ошибка
    alert( r.status + ': ' + r.statusText ); // 404: 
  } else {
    var data = JSON.parse(r.responseText);
    summJson = data.length;
    for (var i=0;i<data.length;i++){
          results.innerHTML += ` <div class="wrp tns-item ${ i < 6 ? "tns-slide-active" : "tns-slide-nonactive" }" id="tns1-item${i}">
          <div class="slides">
            <p class="slides__title">${data[i].name}</p>
            <div class="slides__row">
              <div class="slides__num">${data[i].number}</div>
              <div class="slides__picture-box"> <img class="slides__image" src="${data[i].imageUrl}" width="120" alt='${data[i].name}'></div>
            </div>
          </div>
        </div>`
    }
  }
  r.onreadystatechange = function () {
      if (r.readyState != 4 || r.status != 200) return;
    };
};

const btnGetJSON = [...document.querySelectorAll(".js_json")];
btnGetJSON.map(box2 => {
  box2.addEventListener("click", (showtabs) => {
      var url = box2.dataset.urljs;  
      //to do - create new div and rebild in new or slick slider
      //slider.destroy();
      results.innerHTML = "";
      getDataServ(url);
      //slider = slider.rebuild();
  });
  }
);


