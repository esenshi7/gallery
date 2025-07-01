// --- Supabase Likes Logic ---
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://qofkgqlhyzirokodbpuj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZmtncWxoeXppcm9rb2RicHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNjg5MDUsImV4cCI6MjA2Njg0NDkwNX0.dVWR1Qb6nLnd2ZUpRkRv0JlIyA2rNK2lb4eSZMad3w8';
const supabase = createClient(supabaseUrl, supabaseKey);

const galleryData = [
  {
    id: "akanehououji01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus//Akane%20Hououji_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus//Akane%20Hououji.png",
    desc: "✦ Akane Hououji flotando en el aire. ¡Gracias por apoyar!",
    date: "2024-06-28T10:00:00Z" // Fecha de carga (ejemplo)
  },
  {
    id: "cowgirl01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus//CowGirl_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus//CowGirl.png",
    desc: "✦ Goblin Slayer - Cowgirl con un peinado diferente. ¡Gracias por apoyar!",
    date: "2024-06-25T15:30:00Z" // Fecha de carga (ejemplo)
  }
];

// Ordenar por fecha de carga (más reciente primero)
galleryData.sort((a, b) => new Date(b.date) - new Date(a.date));
console.log('Orden de galería tras sort:', galleryData.map(i => i.id + ' ' + i.date));

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

galleryData.forEach(async item => {
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
  likeBtn.dataset.imageId = item.id; // Añadido data-image-id

  // --- Obtener likes globales desde Supabase ---
  let likes = await getLikesFromSupabase(item.id);
  let liked = localStorage.getItem(`liked-${item.id}`) === "true";
  likeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
  likeBtn.disabled = liked;

  likeBtn.onclick = async () => {
    if (!liked) {
      likes = await incrementLikesInSupabase(item.id);
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
    modalImg.src = item.modalUrl || item.imgUrl;
    modalImg.alt = item.desc;
    modalImg.dataset.imageId = item.id;
    modalDesc.textContent = item.desc;
    renderModalLikes(item);
    // Botón Full Image
    modalFullBtn.innerHTML = `<a href="${item.modalUrl || item.imgUrl}" class="featured-btn" target="_blank">
      <svg class="brush-icon" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.5 2.5L21.5 4.5C22.3284 5.32843 22.3284 6.67157 21.5 7.5L10 19L5 20L6 15L17.5 3.5C18.3284 2.67157 19.1716 2.67157 19.5 2.5Z" stroke="#fff" stroke-width="2" fill="none"/><path d="M6 15L9 18" stroke="#fff" stroke-width="2"/></svg>
      Full Image
    </a>`;
    modal.classList.add("active");
  });

  // Renderiza los likes en el modal
  async function renderModalLikes(itemData) {
    const modalLikes = document.getElementById("imgModalLikes");
    let likes = await getLikesFromSupabase(itemData.id);
    let liked = localStorage.getItem(`liked-${itemData.id}`) === "true";
    modalLikes.innerHTML = "";
    const modalLikeBtn = document.createElement("button");
    modalLikeBtn.className = "like-btn";
    modalLikeBtn.dataset.imageId = itemData.id; // Añadido data-image-id
    modalLikeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
    modalLikeBtn.disabled = liked;
    modalLikeBtn.onclick = async () => {
      if (!liked) {
        likes = await incrementLikesInSupabase(itemData.id);
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

// Suscripción a cambios en la tabla de likes (Realtime)
supabase
  .channel('public:likes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'likes' },
    async payload => {
      const imageId = payload.new?.image_id || payload.old?.image_id;
      if (!imageId) return;
      // Actualiza todos los botones de la galería
      const likeBtns = document.querySelectorAll('.like-btn');
      for (const btn of likeBtns) {
        if (btn.dataset.imageId === imageId) {
          const likes = await getLikesFromSupabase(imageId);
          btn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
        }
      }
      // Si el modal está abierto y corresponde, actualiza el contador del modal
      const modal = document.getElementById("imgModal");
      const modalImg = document.getElementById("imgModalImg");
      if (modal.classList.contains("active") && modalImg.dataset.imageId === imageId) {
        // Busca el itemData por id
        const itemData = galleryData.find(img => img.id === imageId);
        if (itemData) renderModalLikes(itemData);
      }
    }
  )
  .subscribe();

// --- Featured Art Like Button ---
const featuredArt = document.getElementById("featuredArt");
if (featuredArt) {
  const featuredImg = featuredArt.querySelector("img");
  const featuredBtns = featuredArt.querySelector(".featured-btns");
  const featuredId = featuredImg?.dataset.imageId || "featured";

  // Busca el objeto en galleryData por URL, si existe
  let featuredData = galleryData.find(img => img.imgUrl === featuredImg.src);
  if (!featuredData) {
    // Si no está en galleryData, crea un objeto temporal
    featuredData = {
      id: featuredId,
      imgUrl: featuredImg.src,
      desc: featuredImg.alt,
      date: new Date().toISOString()
    };
  }

  // Crear botón de likes
  const featuredLikeBtn = document.createElement("button");
  featuredLikeBtn.className = "like-btn";
  featuredLikeBtn.dataset.imageId = featuredData.id;
  featuredLikeBtn.innerHTML = "❤️ ...";
  featuredLikeBtn.disabled = localStorage.getItem(`liked-${featuredData.id}`) === "true";

  // Renderizar likes iniciales
  async function renderFeaturedLikes() {
    let likes = await getLikesFromSupabase(featuredData.id);
    let liked = localStorage.getItem(`liked-${featuredData.id}`) === "true";
    featuredLikeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
    featuredLikeBtn.disabled = liked;
  }
  renderFeaturedLikes();

  featuredLikeBtn.onclick = async () => {
    let liked = localStorage.getItem(`liked-${featuredData.id}`) === "true";
    if (!liked) {
      let likes = await incrementLikesInSupabase(featuredData.id);
      localStorage.setItem(`liked-${featuredData.id}`, "true");
      featuredLikeBtn.innerHTML = `❤️ ${likes} Like${likes !== 1 ? "s" : ""}`;
      featuredLikeBtn.disabled = true;
    }
  };

  // Insertar el botón en un renglón separado antes del de Full Image
  const likeRow = featuredBtns.querySelector('.featured-like-row');
  likeRow.appendChild(featuredLikeBtn);

  // Actualización en tiempo real para el featured
  supabase
    .channel('public:likes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'likes' },
      async payload => {
        const imageId = payload.new?.image_id || payload.old?.image_id;
        if (imageId === featuredData.id) {
          renderFeaturedLikes();
        }
      }
    )
    .subscribe();
}

// Obtiene el número de likes desde Supabase para una imagen
async function getLikesFromSupabase(imageId) {
  const { data, error } = await supabase
    .from('likes')
    .select('count')
    .eq('image_id', imageId)
    .maybeSingle();
  if (error) return 0;
  if (!data) {
    // Si no existe, crea el registro con count = 0
    await supabase.from('likes').insert([{ image_id: imageId, count: 0 }]);
    return 0;
  }
  return data.count;
}

// Incrementa el contador de likes en Supabase para una imagen
async function incrementLikesInSupabase(imageId) {
  const { data, error } = await supabase
    .from('likes')
    .select('count')
    .eq('image_id', imageId)
    .maybeSingle();
  if (data) {
    const newCount = data.count + 1;
    await supabase.from('likes').update({ count: newCount }).eq('image_id', imageId);
    return newCount;
  } else {
    await supabase.from('likes').insert([{ image_id: imageId, count: 1 }]);
    return 1;
  }
}

// Prueba de conexión a Supabase (versión ES6 módulo)
async function testSupabaseConnection() {
  const { data, error } = await supabase.from('test').select('*');
  if (error) {
    console.error('Error al conectar con Supabase:', error);
  } else {
    console.log('Datos recibidos de Supabase:', data);
  }
}

testSupabaseConnection();