const galleryData = [
  {
    id: "marin01",
    imgUrl: "https://i.ibb.co/8LWWf2M1/Mari-n-kitagawa.png",
    desc: "✦ Marin Kitagawa – Lineart completo. ¡Gracias por verlo!"
  },
  {
    id: "marin02",
    imgUrl: "https://i.ibb.co/8LWWf2M1/Mari-n-kitagawa.png",
    desc: "✦ Marin Kitagawa – Otra toma. ¡Gracias por apoyar!"
  }
];

const gallery = document.getElementById("gallery");

galleryData.forEach(item => {
  const card = document.createElement("div");
  card.className = "gallery-card";

  const img = document.createElement("img");
  img.src = item.imgUrl;
  img.alt = item.desc;

  const body = document.createElement("div");
  body.className = "card-body";

  const desc = document.createElement("p");
  desc.textContent = item.desc;

  const likeBtn = document.createElement("button");
  likeBtn.className = "like-btn";

  const storedLikes = localStorage.getItem(`like-${item.id}`);
  let likes = storedLikes ? parseInt(storedLikes) : 0;
  let liked = localStorage.getItem(`liked-${item.id}`) === "true";

  likeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
  likeBtn.disabled = liked;

  likeBtn.onclick = () => {
    if (!liked) {
      likes++;
      liked = true;
      localStorage.setItem(`like-${item.id}`, likes);
      localStorage.setItem(`liked-${item.id}`, "true");
      likeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
      likeBtn.disabled = true;
    }
  };

  body.appendChild(desc);
  body.appendChild(likeBtn);

  card.appendChild(img);
  card.appendChild(body);
  gallery.appendChild(card);
});
