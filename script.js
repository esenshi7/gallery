const galleryData = [
  {
    id: "akanehououji01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus//Akane%20Hououji.png",
    desc: "✦ Akane Hououji flotando en el aire. ¡Gracias por apoyar!"
  },
  {
    id: "cowgirl01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus//CowGirl.png",
    desc: "✦ Goblin Slayer - Cowgirl con un peinado diferente. ¡Gracias por apoyar!"
  }
];

const gallery = document.getElementById("gallery");

// Likes solo en localStorage
function getLikes(imageId) {
  return parseInt(localStorage.getItem(`likes-${imageId}`) || "0", 10);
}

function incrementLikes(imageId) {
  let count = getLikes(imageId) + 1;
  localStorage.setItem(`likes-${imageId}`, count);
  return count;
}

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

  let likes = getLikes(item.id);
  let liked = localStorage.getItem(`liked-${item.id}`) === "true";
  likeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
  likeBtn.disabled = liked;

  likeBtn.onclick = () => {
    if (!liked) {
      likes = incrementLikes(item.id);
      liked = true;
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
    const modalFullBtn = document.getElementById("imgModalFullBtn");
    modalImg.src = item.imgUrl;
    modalImg.alt = item.desc;
    modalDesc.textContent = item.desc;
    renderModalLikes(item);
    // Botón Full Image
    modalFullBtn.innerHTML = `<a href="${item.imgUrl}" class="featured-btn" target="_blank">
      <svg class="brush-icon" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.5 2.5L21.5 4.5C22.3284 5.32843 22.3284 6.67157 21.5 7.5L10 19L5 20L6 15L17.5 3.5C18.3284 2.67157 19.1716 2.67157 19.5 2.5Z" stroke="#fff" stroke-width="2" fill="none"/><path d="M6 15L9 18" stroke="#fff" stroke-width="2"/></svg>
      Full Image
    </a>`;
    modal.classList.add("active");
  });

  function renderModalLikes(itemData) {
    const modalLikes = document.getElementById("imgModalLikes");
    let likes = getLikes(itemData.id);
    let liked = localStorage.getItem(`liked-${itemData.id}`) === "true";
    modalLikes.innerHTML = "";
    const modalLikeBtn = document.createElement("button");
    modalLikeBtn.className = "like-btn";
    modalLikeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
    modalLikeBtn.disabled = liked;
    modalLikeBtn.onclick = () => {
      if (!liked) {
        likes = incrementLikes(itemData.id);
        liked = true;
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

// Prueba de conexión a Supabase
async function testSupabaseConnection() {
  const { data, error } = await window.mySupabase.from('test').select('*');
  if (error) {
    console.error('Error al conectar con Supabase:', error);
  } else {
    console.log('Datos recibidos de Supabase:', data);
  }
}

testSupabaseConnection();