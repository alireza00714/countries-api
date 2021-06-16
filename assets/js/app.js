$.ajax({
  type: "get",
  url: "https://restcountries.eu/rest/v2/all",
}).done(function (res) {
  res.forEach((item) => {
    $("#countries").append(`
      <option value="${item.name}"></option>
      `);
  });
  $("#countries-input").change(function () {
    $.ajax({
      type: "get",
      url: `https://restcountries.eu/rest/v2/name/${$(this).val()}?fullText=true`,
    }).done((response) => {
      $("#information").html(`
        <h3 class="text-center text-white mt-2 information-heading">اطلاعات</h3>
        <hr class="text-white m-0 p-0" />
        <div class="d-flex justify-content-between p-3 w-100">
        <span class="information-content">${response[0].name}</span>
        <span class="information-content">:نام</span>
      </div>
      <div class="d-flex justify-content-between p-3 w-100">
        <span class="information-content">${response[0].nativeName}</span>
        <span class="information-content">:نام اصلی</span>
      </div>
      <div class="d-flex justify-content-between p-3 w-100">
        <span class="information-content">${response[0].capital}</span>
        <span class="information-content">:پایتخت</span>
      </div>
      <div class="d-flex justify-content-between p-3 w-100">
        <span class="information-content">${response[0].region}</span>
        <span class="information-content">:قاره</span>
      </div>
      <div class="d-flex justify-content-between p-3 w-100">
        <span class="information-content fa-digits">${response[0].population}</span>
        <span class="information-content">:جمعیت</span>
      </div>
      <div class="d-flex justify-content-between p-3 w-100">
        <span class="information-content">${response[0].timezones}</span>
        <span class="information-content">:منطقه زمانی</span>
      </div>
        `);

      $("#flag").html(`
        <img class="w-100 h-100" style="border-radius: 1rem;" src="${response[0].flag}" alt="" srcset="">
        `);

      $("#tell-code").text(`+${response[0].callingCodes[0]}`);

      $.ajax({
        type: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${response[0].capital}&appid=44b1fe8a6c0207544cdd674445971577`,
      }).done(function (response) {
        $("#weather-report").html(`
          <h3 class="text-center text-white mt-2 information-heading">${response.name} وضعیت هوای شهر</h3>
          <hr class="text-white m-0 p-0" />
          <div class="weather-img d-flex justify-content-center">
            <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png" alt="" />
          </div>
          <div class="d-flex justify-content-between p-3 w-100">
            <span class="information-content">${response.wind.speed} km/h</span>
            <span class="information-content">:سرعت باد</span>
          </div>
          <div class="d-flex justify-content-between p-3 w-100">
            <span class="information-content">${Math.round(response.main.temp - 273.15)}°C</span>
            <span class="information-content">:دما</span>
          </div>
          <div class="d-flex justify-content-between p-3 w-100">
            <span class="information-content">${response.main.humidity}%</span>
            <span class="information-content">:رطوبت</span>
          </div>
          <div class="d-flex justify-content-between p-3 w-100">
            <span class="information-content">${response.visibility}</span>
            <span class="information-content">:میدان دید</span>
          </div>
        `);
      });

      showMap(response[0].latlng[0], response[0].latlng[1]);
    });
  });
});

function showMap(lat, lng) {
  var app = new Mapp({
    element: "#mymap",
    presets: {
      latlng: {
        lat: lat,
        lng: lng,
      },
      zoom: 6,
    },
    apiKey:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk4MmYxZmEyMTIwZWRhYzAzMjM4NTYyZWE2NmIwNDljOGZjOTlmMTJmMmE0YzU3M2U2MGVmODZkMzgwOGExNzRmYmViZmRjYzRlYzVmNDY2In0.eyJhdWQiOiIxNDIzMyIsImp0aSI6Ijk4MmYxZmEyMTIwZWRhYzAzMjM4NTYyZWE2NmIwNDljOGZjOTlmMTJmMmE0YzU3M2U2MGVmODZkMzgwOGExNzRmYmViZmRjYzRlYzVmNDY2IiwiaWF0IjoxNjIyNzM3ODAzLCJuYmYiOjE2MjI3Mzc4MDMsImV4cCI6MTYyNTMyOTgwMywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.RdkoUq_laMFmmS6C5OOUvFUGkbKVhnzaugwODXTQG6eNPqEXicrnzeeLFDNIWU4KF-40fOzVRVTe6i7lzD7ZPVbgsasBtIkPPwEtK2OtuyIW9E1_Her91eifN2hL5LRozab5XOmll_KiAoCgv7hs2hTX41xiZHUzafFcXAi1ee0mxi02Rfqgyarm-ILqU2AkZb7cMlHwElg_8jIWe9w05hzD9E6gj9-oYOF1dFSJV6kX_YEoyGfNrHR2uwHssMhnXWx4k3QfYKAUTl67_ZZyZcJopqWlz4kOvVGHqytrON-Nz7pvD-AG9rBscYW5n6A9N2ZMCExyXu9XoLosVWulDg",
  });

  app.addLayers();
}
