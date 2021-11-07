export const uploadImage = (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "ubllb9oo");
  data.append("cloud_name", "dc9htgupc");
  fetch("https://api.cloudinary.com/v1_1/dc9htgupc/image/upload", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.url);
      return data.url;
    })
    .catch((err) => console.log(err));
};
