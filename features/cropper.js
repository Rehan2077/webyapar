let image = document.getElementById("profilePhoto");
let photoBtn = document.getElementById("photoBtn");
let modalImage = document.getElementById("modalImage");
let cropBtn = document.getElementById("cropBtn");
let allImage = document.getElementsByClassName("profilePhotoClass");
let cropper;
var formData = new FormData();

let crop = false;

function handlePhotoSubmit() {
  const photo = photoBtn.files[0];

  modalImage.src = URL.createObjectURL(photo);

  crop = true;

  handleCrop();
}

function handleCrop() {
  cropper = new Cropper(modalImage, {
    aspectRatio: 1,
    viewMode: 1,
  });
}

cropBtn.addEventListener("click", () => {
  if (crop && cropper) {
    console.log("Pressed");

    var croppedImage = cropper
      .getCroppedCanvas({
        width: 160,
        height: 160,
      })
      .toDataURL("image/webp");

    console.log(croppedImage);

    allImage[0].src = croppedImage;
    allImage[1].src = croppedImage;

    const blob = base64ToBlob(croppedImage);
    console.log(blob);
    
    formData.append("croppedImage", blob, "croppedImage.webp");
    formData.append("name", document.getElementById("name").value);

    console.log(formData);
  }
});

function handleSubmit(e) {
  console.log("Hello");
  fetch("/user/upload", {
    method: "post",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error uploading image:", error);
    });
}

function base64ToBlob(base64data) {
  const parts = base64data.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const byteCharacters = atob(parts[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}
