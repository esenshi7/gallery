// --- Supabase Likes Logicc ---
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://qofkgqlhyzirokodbpuj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZmtncWxoeXppcm9rb2RicHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNjg5MDUsImV4cCI6MjA2Njg0NDkwNX0.dVWR1Qb6nLnd2ZUpRkRv0JlIyA2rNK2lb4eSZMad3w8';
const supabase = createClient(supabaseUrl, supabaseKey);

// Galería After Dark Room (con propiedad order para ordenamiento explícito)
const afterDarkImages = [
  {
    id: "marinkitagawa01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/After_Dark/Marin%20kitagawa_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/After_Dark/Marin%20Kitagawa.png",
    order: 3
  },
  {
    id: "akanehououji01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus//Akane%20Hououji_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus//Akane%20Hououji.png",
    order: 2
  },
  {
    id: "cowgirl01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus//CowGirl_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus//CowGirl.png",
    order: 1
  }
];

if (document.getElementById("gallery")) {
  const galleryEl = document.getElementById("gallery");
  galleryEl.innerHTML = "";
  afterDarkImages
    .sort((a, b) => b.order - a.order)
    .forEach(item => {
      const card = document.createElement("div");
      card.className = "gallery-card";
      const img = document.createElement("img");
      img.src = item.imgUrl;
      img.alt = "";
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        openMainModal(item);
      });
      card.appendChild(img);
      galleryEl.appendChild(card);
    });
}

// --- Modal Disclaimer X (Twitter) ---
const xBtn = document.querySelector('.social-btn.x');
const xDisclaimerModal = document.getElementById('xDisclaimerModal');
const xDisclaimerContinue = document.getElementById('xDisclaimerContinue');
const xDisclaimerCancel = document.getElementById('xDisclaimerCancel');

if (xBtn && xDisclaimerModal && xDisclaimerContinue && xDisclaimerCancel) {
  xBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Forzar display y clase active
    xDisclaimerModal.style.display = 'flex';
    xDisclaimerModal.classList.add('active');
    // Mostrar el contenido del modal (por si alguna regla global lo oculta)
    const info = xDisclaimerModal.querySelector('.img-modal-info');
    if (info) {
      info.style.display = 'block';
      info.style.setProperty('display', 'block', 'important');
    }
    const desc = xDisclaimerModal.querySelector('.img-modal-desc');
    if (desc) {
      desc.style.display = 'block';
      desc.style.setProperty('display', 'block', 'important');
    }
  });
  xDisclaimerContinue.addEventListener('click', function() {
    window.open('https://x.com/ecchisenshi', '_blank');
    xDisclaimerModal.style.display = 'none';
    xDisclaimerModal.classList.remove('active');
  });
  xDisclaimerCancel.addEventListener('click', function() {
    xDisclaimerModal.style.display = 'none';
    xDisclaimerModal.classList.remove('active');
  });
  // Cerrar modal al hacer clic fuera del contenido
  xDisclaimerModal.addEventListener('click', function(e) {
    if (e.target === xDisclaimerModal) {
      xDisclaimerModal.style.display = 'none';
      xDisclaimerModal.classList.remove('active');
    }
  });
}

// Galería principal para la página principal (con propiedad order)
const galleryMainData = [
  {
    id: "ariane01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/ArianeTakahashi_Presentation_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/ArianeTakahashi_Presentation.png",
    order: 4
  },
  {
    id: "ukyo01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/UkyoKaya_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/UkyoKaya.png",
    order: 3
  },
  {
    id: "yor01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/Yor_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/Yor.png",
    order: 2
  },
  {
    id: "zerotwo01",
    imgUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/ZeroTwo_thumb.png",
    modalUrl: "https://qofkgqlhyzirokodbpuj.supabase.co/storage/v1/object/public/gallery-waifus/Normal/ZeroTwo.png",
    order: 1
  }
];

const galleryMain = document.getElementById("gallery-main");
if (galleryMain) {
  galleryMain.innerHTML = "";
  galleryMainData
    .sort((a, b) => b.order - a.order)
    .forEach(item => {
      const card = document.createElement("div");
      card.className = "gallery-card";
      const img = document.createElement("img");
      img.src = item.imgUrl;
      img.alt = "";
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