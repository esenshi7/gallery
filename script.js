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
      // Si el modal está abierto y corresponde a esta imagen, actualiza el botón de likes del modal
      const modal = document.getElementById("imgModal");
      const modalImg = document.getElementById("imgModalImg");
      if (modal.classList.contains("active") && modalImg.src === item.imgUrl) {
        renderModalLikes(item);
      }
    }
  };

  img.addEventListener("click", () => {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgModalImg");
    const modalDesc = document.getElementById("imgModalDesc");
    modalImg.src = item.imgUrl;
    modalImg.alt = item.desc;
    modalDesc.textContent = item.desc;
    renderModalLikes(item);
    modal.classList.add("active");
  });

  function renderModalLikes(itemData) {
    const modalLikes = document.getElementById("imgModalLikes");
    // Crear un botón de likes similar al de la galería
    const storedLikes = localStorage.getItem(`like-${itemData.id}`);
    let likes = storedLikes ? parseInt(storedLikes) : 0;
    let liked = localStorage.getItem(`liked-${itemData.id}`) === "true";
    modalLikes.innerHTML = "";
    const modalLikeBtn = document.createElement("button");
    modalLikeBtn.className = "like-btn";
    modalLikeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
    modalLikeBtn.disabled = liked;
    modalLikeBtn.onclick = () => {
      if (!liked) {
        likes++;
        liked = true;
        localStorage.setItem(`like-${itemData.id}`, likes);
        localStorage.setItem(`liked-${itemData.id}`, "true");
        modalLikeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
        modalLikeBtn.disabled = true;
        // Actualiza el botón de la galería también
        likeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
        likeBtn.disabled = true;
      }
    };
    modalLikes.appendChild(modalLikeBtn);
  }

  body.appendChild(desc);
  body.appendChild(likeBtn);

  card.appendChild(img);
  card.appendChild(body);
  gallery.appendChild(card);
});

const imgModal = document.getElementById("imgModal");
const imgModalClose = document.getElementById("imgModalClose");
imgModalClose.addEventListener("click", () => {
  imgModal.classList.remove("active");
});
imgModal.addEventListener("click", (e) => {
  if (e.target === imgModal) {
    imgModal.classList.remove("active");
  }
});
