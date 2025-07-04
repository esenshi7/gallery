// --- Supabase Likes Logicc ---
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
  // Evento para Google Analytics: clic en imagen de galería
  img.addEventListener("click", () => {
    if (typeof gtag === 'function') {
      gtag('event', 'click_imagen_galeria', {
        event_category: 'Galeria',
        event_label: item.id,
        value: 1
      });
    }
  });

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
    modalImg.src = item.modalUrl || item.imgUrl;
    modalImg.alt = item.desc;
    modalImg.dataset.imageId = item.id;
    modalDesc.textContent = item.desc;
    renderModalLikes(item);
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

// --- Modal Disclaimer X (Twitter) ---
const xBtn = document.querySelector('.social-btn.x');
const xDisclaimerModal = document.getElementById('xDisclaimerModal');
const xDisclaimerContinue = document.getElementById('xDisclaimerContinue');
const xDisclaimerCancel = document.getElementById('xDisclaimerCancel');

if (xBtn && xDisclaimerModal && xDisclaimerContinue && xDisclaimerCancel) {
  xBtn.addEventListener('click', function(e) {
    e.preventDefault();
    xDisclaimerModal.style.display = 'flex';
  });
  xDisclaimerContinue.addEventListener('click', function() {
    window.open('https://x.com/ecchisenshi', '_blank');
    xDisclaimerModal.style.display = 'none';
  });
  xDisclaimerCancel.addEventListener('click', function() {
    xDisclaimerModal.style.display = 'none';
  });
  // Cerrar modal al hacer clic fuera del contenido
  xDisclaimerModal.addEventListener('click', function(e) {
    if (e.target === xDisclaimerModal) {
      xDisclaimerModal.style.display = 'none';
    }
  });
}

// Galería principal para la página principal
const galleryMainData = [
  {
    id: "ariane01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/ArianeTakahashi_Presentation_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/ArianeTakahashi_Presentation.png",
    desc: "Ariane Takahashi presentándose."
  },
  {
    id: "ukyo01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/UkyoKaya_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/UkyoKaya.png",
    desc: "Ukyo Kaya en pose casual."
  },
  {
    id: "yor01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/Yor_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/Yor.png",
    desc: "Yor lista para la acción."
  },
  {
    id: "zerotwo01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/ZeroTwo_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/ZeroTwo.png",
    desc: "Zero Two mirando al horizonte."
  }
];

const galleryMain = document.getElementById("gallery-main");
if (galleryMain) {
  galleryMainData.forEach(item => {
    const card = document.createElement("div");
    card.className = "gallery-card";

    const img = document.createElement("img");
    img.src = item.imgUrl;
    img.alt = item.desc;
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      openMainModal(item);
    });

    card.appendChild(img);
    galleryMain.appendChild(card);
  });
}

// Modal para galería principal
function openMainModal(item) {
  let modal = document.getElementById("mainImgModal");
  if (modal) {
    modal.remove(); // Elimina cualquier modal previo antes de crear uno nuevo
  }
  // Crea el overlay de fondo
  const overlay = document.createElement("div");
  overlay.className = "img-modal active";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.zIndex = "3000";
  overlay.style.background = "rgba(30,30,40,0.7)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.id = "mainImgModal";

  // Crea el modal visual
  const modalDiv = document.createElement("div");
  modalDiv.className = "img-modal-instagram";
  modalDiv.style.width = "100vw";
  modalDiv.style.height = "100vh";
  modalDiv.style.display = "flex";
  modalDiv.style.alignItems = "center";
  modalDiv.style.justifyContent = "center";
  modalDiv.style.background = "transparent";
  modalDiv.style.padding = "0";
  modalDiv.style.margin = "0";
  modalDiv.style.borderRadius = "0";
  modalDiv.style.boxShadow = "none";
  modalDiv.style.position = "relative";

  // Fondo clickeable dentro del modal
  const bg = document.createElement("div");
  bg.className = "img-modal-bg";
  bg.style.position = "absolute";
  bg.style.top = "0";
  bg.style.left = "0";
  bg.style.width = "100vw";
  bg.style.height = "100vh";
  bg.style.zIndex = "1";

  // Imagen
  const img = document.createElement("img");
  img.className = "img-modal-content";
  img.src = item.modalUrl;
  img.alt = item.desc;
  img.style.maxWidth = "100vw";
  img.style.maxHeight = "100vh";
  img.style.width = "auto";
  img.style.height = "auto";
  img.style.objectFit = "contain";
  img.style.background = "transparent";
  img.style.display = "block";
  img.style.borderRadius = "0";
  img.style.margin = "0";
  img.style.zIndex = "2";
  img.style.position = "relative";

  // Botón de cerrar
  const closeBtn = document.createElement("button");
  closeBtn.className = "img-modal-close";
  closeBtn.setAttribute("aria-label", "Cerrar");
  closeBtn.style.background = "rgba(255,255,255,0.7)";
  closeBtn.style.borderRadius = "50%";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "18px";
  closeBtn.style.right = "24px";
  closeBtn.style.fontSize = "40px";
  closeBtn.style.color = "#222";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.width = "56px";
  closeBtn.style.height = "56px";
  closeBtn.style.display = "flex";
  closeBtn.style.alignItems = "center";
  closeBtn.style.justifyContent = "center";
  closeBtn.style.padding = "0";
  closeBtn.style.zIndex = "10";
  closeBtn.innerHTML = `
    <svg viewBox="0 0 40 40" width="38" height="38">
      <line x1="12" y1="12" x2="28" y2="28" stroke="#222" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="28" y1="12" x2="12" y2="28" stroke="#222" stroke-width="3.5" stroke-linecap="round"/>
    </svg>
  `;

  // Ensamblar modal
  modalDiv.appendChild(bg);
  modalDiv.appendChild(img);
  modalDiv.appendChild(closeBtn);
  overlay.appendChild(modalDiv);
  document.body.appendChild(overlay);

  // Cerrar al hacer clic fuera del modal (overlay)
  overlay.addEventListener('mousedown', function(e) {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
  // Cerrar al hacer clic en el fondo dentro del modal
  bg.addEventListener('mousedown', function(e) {
    overlay.remove();
  });
  // Prevenir cierre al hacer clic en la imagen
  img.addEventListener('mousedown', function(e) {
    e.stopPropagation();
  });
  // Cerrar con el botón
  closeBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    overlay.remove();
  });
}