$("#img-btn").click(function () {
  let soleValue = $("#enterSole").val();
  let pageValue = $("#enterPage").val();

  if (soleValue === "" || pageValue === "") {
    alert("Please fill the field");
    return;
  }

  $("#bottom img").remove();
  $.ajax({
    type: "GET",
    url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
    success: function (data) {
      let photos = data.photos;
      console.log(photos.length);
      if (photos.length === 0) {
        showNotification(
          " Entered page is empty"
        );
        return;
      }

      for (const img of photos) {
        if (soleValue >= 0 && soleValue <= 1000) {
          let images = img.img_src;

          $("<img>", {
            src: images,
            width: "30%",
          }).appendTo("#bottom");
        } else {
          showNotification("Please Enter valid value");
          return;
        }
      }
    },
    data: {
      sol: soleValue,
      page: pageValue,
      api_key: "DEMO_KEY",
    },
  });
});

function showNotification(message) {
  alert(message);
}
