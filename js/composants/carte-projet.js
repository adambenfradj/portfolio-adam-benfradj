/* =================================================================
   carte-projet.js — Fabrique les éléments du monde :
   - creerCarteProjet() : une TV-projet (avec grésillement dans l'écran)
   - creerContact()     : le personnage de contact (le lapin)
   ================================================================= */

/* ---- Crée une TV-projet cliquable ----
   p        : un objet projet (depuis projets.json)
   surClic  : fonction appelée au clic (ouvre la modale) */
function creerCarteProjet(p, surClic){
  const el = document.createElement("div");
  el.className = "tv-projet";
  if (p.id === "run-rabbit-run") el.classList.add("tv-projet--run-rabbit");

  // Rectangle de l'écran de CETTE TV, légèrement rétréci (1.5%)
  // pour rester bien à l'intérieur du trou -> pas de débordement.
  const r = rectEcran(p.tv);
  const ex = r.x + 1.5, ey = r.y + 1.5, ew = r.w - 3, eh = r.h - 3;

  // Le grésillement (.tv-screen) est placé AVANT l'image : il est donc
  // DERRIÈRE la TV (z1) et passe par le trou de l'écran (z2 = la TV).
  el.innerHTML = `
    <div class="tv-box">
      <div class="tv-screen" style="left:${ex}%;top:${ey}%;width:${ew}%;height:${eh}%">
        <span class="static"></span><span class="sweep"></span><span class="crt"></span>
      </div>
      <img src="${p.tv}" alt="${p.titre}">
    </div>
    <span class="tag">${p.titre}</span>`;

  el.addEventListener("click", () => surClic(p));
  return el;
}

/* ---- Crée le personnage de CONTACT (le lapin) ----
   surClic : fonction appelée au clic (ouvre la modale contact)
   Retourne l'élément ; l'image de frame est changée par main.js selon la
   distance (il sort / range son flyer). */
function creerContact(surClic){
  const el = document.createElement("div");
  el.id = "contact-perso";
  el.innerHTML = `<img id="contact-img" src="${CONTACT_FRAMES[0]}" alt="Contact">
                  <span class="tag">CONTACT</span>`;
  el.addEventListener("click", surClic);
  return el;
}
