document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // 1. THEME TOGGLE
  // =====================================
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-theme");

      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Dark горимд шилжих" : "Light горимд шилжих"
      );
    });
  }

  // =====================================
  // 2. ГИШҮҮДИЙН CAROUSEL
  // Голын карт 3 секунд тутам солигдоно.
  // Намтар уншиж байхад хөдөлгөөн зогсоно.
  // =====================================
  const memberCards = Array.from(
    document.querySelectorAll(".members-grid .member-card")
  );

  let currentMember = 0;
  let memberTimer = null;

  function updateMemberCarousel() {
    const total = memberCards.length;

    memberCards.forEach((card, index) => {
      card.classList.remove(
        "active-member",
        "member-prev",
        "member-next"
      );

      card.setAttribute("aria-hidden", "true");
      card.tabIndex = -1;

      if (index === currentMember) {
        card.classList.add("active-member");
        card.setAttribute("aria-hidden", "false");
        card.tabIndex = 0;
      } else if (index === (currentMember - 1 + total) % total) {
        card.classList.add("member-prev");
      } else if (index === (currentMember + 1) % total) {
        card.classList.add("member-next");
      }
    });
  }

  function stopMemberRotation() {
    if (memberTimer !== null) {
      clearInterval(memberTimer);
      memberTimer = null;
    }
  }

  function startMemberRotation() {
    stopMemberRotation();

    if (memberCards.length < 2) return;

    memberTimer = setInterval(() => {
      const activeCard = memberCards[currentMember];

      if (activeCard.classList.contains("is-flipped")) {
        stopMemberRotation();
        return;
      }

      currentMember = (currentMember + 1) % memberCards.length;
      updateMemberCarousel();
    }, 3000);
  }

  memberCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;
      if (!card.classList.contains("active-member")) return;

      const flipped = card.classList.toggle("is-flipped");

      if (flipped) {
        stopMemberRotation();
      } else {
        startMemberRotation();
      }
    });

    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }

      if (
        event.key === "Escape" &&
        card.classList.contains("active-member")
      ) {
        card.classList.remove("is-flipped");
        startMemberRotation();
      }
    });
  });

  if (memberCards.length > 0) {
    updateMemberCarousel();
    startMemberRotation();
  }

  // =====================================
  // 3. ЦОМГИЙН КАРТ
  // Автоматаар солигдохгүй.
  // Дарахад ар тал нь харагдана.
  // =====================================
  const albumCards = document.querySelectorAll(".album-card");

  albumCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;
      card.classList.toggle("is-flipped");
    });

    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }

      if (event.key === "Escape") {
        card.classList.remove("is-flipped");
      }
    });
  });

  // =====================================
  // 4. ЦОМГИЙН УДИРДЛАГУУДЫГ НУУХ
  // =====================================
  ["prevAlbum", "nextAlbum", "rotationToggle"].forEach((id) => {
    const control = document.getElementById(id);
    if (control) control.remove();
  });

  document.querySelectorAll(".carousel-note").forEach((note) => {
    note.remove();
  });
});