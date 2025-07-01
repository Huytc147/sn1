document.addEventListener("DOMContentLoaded", function () {
  // --- NƠI ĐỂ BẠN VIẾT LỜI CHÚC CỦA MÌNH ---
  const myBirthdayWish =
    "Chúc Văn Dương Hồng Vỹ tuổi 20 thật hạnh phúc, vui vẻ bên cạnh những người mà u thích. Chúc u không chỉ ngày sinh nhật vui vẻ mà sau này, ngày ngày cũng phải vui vẻ. Chúc u đạt được những điều mình muốn và những điều đạt được đấy sẽ là những điều tốt đẹp nhất. Tuổi 20 không còn tiêu cực cũng chẳng còn khóc nhè. Hi vọng Vỹ mỗi ngày sẽ thật hạnh phúc và những điều muộn phiền sẽ rời xa u.";
  // ---------------------------------------------

  const modalElement = document.querySelector(".birthday_inner__modal");
  let progress = 1;
  let mixing = false;
  let mixtimes = 0;
  let bases = 0;
  let fillings = 0;

  // --- Helper Functions for fadeIn/fadeOut ---
  function fadeOutElement(element, duration = 400, callback) {
    if (!element) return;
    element.style.transition = `opacity ${duration / 1000}s ease-out`;
    element.style.opacity = "0";
    setTimeout(() => {
      element.style.display = "none";
      if (callback) callback();
    }, duration);
  }

  function fadeInElement(
    element,
    duration = 400,
    displayType = "block",
    callback
  ) {
    if (!element) return;
    element.style.opacity = "0";
    element.style.display = displayType;
    // Force a reflow before applying the opacity transition
    element.offsetHeight;
    element.style.transition = `opacity ${duration / 1000}s ease-in`;
    element.style.opacity = "1";
    if (callback) {
      setTimeout(callback, duration);
    }
  }

  // --- Modal Functions ---
  function fire_modal(imgurl, title, content) {
    if (!modalElement) return;
    modalElement.querySelector("h1").innerHTML = title;
    modalElement.querySelector("img").setAttribute("src", imgurl);
    modalElement.querySelector("p").innerHTML = content;
    setTimeout(function () {
      modalElement.style.transform = "translateY(-50%) scale(1)";
    }, 1000);
  }

  function close_modal(currentProgress) {
    if (!modalElement) return;
    modalElement.style.transform = "translateY(-50%) scale(0)";
    setTimeout(function () {
      const stageToShow = document.querySelector(".stage" + currentProgress);
      if (stageToShow) {
        fadeInElement(stageToShow);
      }
    }, 600);
  }

  // --- Event Listener for Start Button ---
  const startButton = document.querySelector(".start");
  if (startButton) {
    startButton.addEventListener("click", function () {
      const stage1 = document.querySelector(".stage1");
      if (stage1) {
        fadeOutElement(stage1);
      }
      fire_modal(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/cake_modal.png",
        "Let’s make a cake!",
        "Vì hôm nay là sinh nhật của Vỹ vì vậy tui muốn Vỹ tự tạo cho mình một chiếc bánh kem thật ý nghĩa với màu sắc mà Vỹ thích. Trộn vào đó chút vui, chút mơ và thật nhiều yêu thương. Nướng trong lò ảo, nơi hạnh phúc âm thầm lan tỏa. Rồi trang trí bằng sắc màu mà trái tim u lựa chọn. Chúc Vỹ một sinh nhật ấm áp và ngọt ngào — như chính chiếc bánh u tạo nên. 🎂✨."
      );
    });
  }

  // --- Event Listener for Modal Button ---
  const modalButton = modalElement
    ? modalElement.querySelector("button")
    : null;
  if (modalButton) {
    modalButton.addEventListener("click", function () {
      progress++;
      close_modal(progress);
    });
  }

  // --- Mixer Logic ---
  const mixerButton = document.querySelector(".mixer");
  if (mixerButton) {
    mixerButton.addEventListener("click", function () {
      if (mixing === false) {
        mixing = true;
        mixtimes++;
        const spoonImg = document.querySelector(".mix_spoon img");
        if (spoonImg) {
          spoonImg.classList.add("move");
          setTimeout(function () {
            spoonImg.classList.remove("move");
            mixing = false;
          }, 1000);
        }
      }
      if (mixtimes === 6) {
        const stage2 = document.querySelector(".stage2");
        if (stage2) {
          fadeOutElement(stage2);
        }
        fire_modal(
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/mix_modal.png",
          "Mix successful!",
          "Chúc mừng u, hỗn hợp thật hoàn hảo! Giờ hãy đổ nó vào khuôn bánh — thật khéo léo, như cách u đang rót vào đó một niềm vui nhỏ. Và đến lúc đặt chiếc khuôn ấy vào lò nướng. Chỉ cần khoảng 3 giây thôi… cũng đủ để nền bánh mềm xốp, ấm áp như lòng người đang đón sinh nhật."
        );
      }
    });
  }

  // --- Drag and Drop Logic ---
  const tinElement = document.querySelector(".tin");
  const ovenElement = document.querySelector(".oven");

  if (tinElement) {
    tinElement.setAttribute("draggable", "true");
    tinElement.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text/plain", "tin");
    });
  }

  if (ovenElement) {
    ovenElement.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    ovenElement.addEventListener("drop", function (event) {
      event.preventDefault();
      if (event.dataTransfer.getData("text/plain") === "tin") {
        const stage3 = document.querySelector(".stage3");
        if (stage3) {
          fadeOutElement(stage3);
        }
        fire_modal(
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/oven_modal.png",
          "Bake successful!",
          "Tuyệt vời! u làm được đến đây thì đúng là một đầu bếp tài hoa rồi đấy. Phần đế bánh đã chín vàng, mềm xốp và thơm đến nao lòng. Giờ là lúc biến nó thành một tuyệt phẩm ngọt ngào — hãy kết hợp cùng mứt dâu, mứt cam, sô-cô-la, và thật nhiều điều ngon lành khác. Chiếc bánh sinh nhật mơ ước đang dần thành hình — theo cách mà chỉ riêng u mới tạo nên được. 🎂💫"
        );
      }
    });
  }

  // --- Cake Building Logic ---
  const cakemakeElement = document.querySelector(".cakemake");
  const spongesContainer = document.querySelector(".sponges");
  const fillingsContainer = document.querySelector(".fillings");
  const spongesCountSpan = spongesContainer
    ? spongesContainer.querySelector("h5 span")
    : null;
  const fillingsCountSpan = fillingsContainer
    ? fillingsContainer.querySelector("h5 span")
    : null;

  function add_sponge(type) {
    if (!cakemakeElement || !spongesCountSpan) return;
    const spongeHtml = `<div style="width:${
      200 - bases * 20
    }px" class="sponge sponge-${type}"><div></div><div></div><div></div><div></div><div></div></div>`;
    cakemakeElement.insertAdjacentHTML("afterbegin", spongeHtml);
    bases++; // Increment here after using the value
    spongesCountSpan.innerHTML = bases;
  }

  function add_filling(type) {
    if (!cakemakeElement || !fillingsCountSpan) return;
    const fillingHtml = `<div style="width:${
      200 - bases * 20
    }px" class="filling filling-${type}"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    cakemakeElement.insertAdjacentHTML("afterbegin", fillingHtml);
    fillings++; // Increment here
    fillingsCountSpan.innerHTML = fillings;
  }

  if (spongesContainer) {
    const spongeItems = spongesContainer.querySelectorAll(".item_inner");
    spongeItems.forEach((item) => {
      item.addEventListener("click", function () {
        if (bases < 5) {
          spongesContainer.classList.add("inactive");
          if (fillingsContainer) fillingsContainer.classList.remove("inactive");
          const type = this.classList.item(this.classList.length - 1);
          add_sponge(type);
        }
        if (bases >= 5) {
          spongesContainer.classList.add("inactive");
        }
      });
    });
  }

  if (fillingsContainer) {
    const fillingItems = fillingsContainer.querySelectorAll(".item_inner");
    fillingItems.forEach((item) => {
      item.addEventListener("click", function () {
        if (fillings < 6) {
          fillingsContainer.classList.add("inactive");
          if (spongesContainer) spongesContainer.classList.remove("inactive");
          const type = this.classList.item(this.classList.length - 1);
          add_filling(type);
        }
        if (fillings >= 6) {
          fillingsContainer.classList.add("inactive");
        }
      });
    });
  }

  const startAgainButton = document.querySelector(".startagain");
  if (startAgainButton) {
    startAgainButton.addEventListener("click", function () {
      if (cakemakeElement) {
        cakemakeElement.innerHTML = '<div class="base"></div>';
      }
      bases = 0;
      fillings = 0;
      if (spongesCountSpan) spongesCountSpan.innerHTML = bases;
      if (fillingsCountSpan) fillingsCountSpan.innerHTML = fillings;

      if (fillingsContainer) fillingsContainer.classList.remove("inactive");
      if (spongesContainer) spongesContainer.classList.remove("inactive");
      fillingsContainer.classList.add("inactive");
    });
  }

  // --- Finishing Functions ---
  function add_candle() {
    if (!cakemakeElement) return;

    const candleHtml =
      '<div class="candle"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/candle.png" /></div>';
    cakemakeElement.insertAdjacentHTML("afterbegin", candleHtml);

    // Show the birthday text
    const birthdayText = document.querySelector(".birthday-text");
    if (birthdayText) {
      setTimeout(() => {
        fadeInElement(birthdayText, 800, "block");
      }, 1200);
    }

    // Show the final buttons
    const finalButtons = document.querySelector(".final-buttons");
    if (finalButtons) {
      setTimeout(function () {
        fadeInElement(finalButtons, 400, "flex");
      }, 2200);
    }
  }

  function fin() {
    const elementsToFade = document.querySelectorAll(
      ".stage4 h1, .stage4 h2, .options, .startagain, .add"
    );
    elementsToFade.forEach((el) => fadeOutElement(el));

    setTimeout(function () {
      if (cakemakeElement) {
        fadeInElement(cakemakeElement);
        cakemakeElement.style.transition = "margin-top 1s ease";
        cakemakeElement.style.marginTop = "-20px";
      }
    }, 1000);
    add_candle();
  }

  const addButton = document.querySelector(".add");
  if (addButton) {
    addButton.addEventListener("click", fin);
  }

  // --- New Wish Modal Logic ---
  const wishBtn = document.querySelector(".wish-btn");
  const wishModal = document.querySelector(".birthday_inner__wish-modal");
  const closeWishBtn = document.querySelector(".close-wish-modal");
  const wishParagraph = wishModal ? wishModal.querySelector("p") : null;

  if (wishBtn && wishModal && wishParagraph) {
    wishBtn.addEventListener("click", function () {
      wishParagraph.textContent = myBirthdayWish;
      wishModal.style.transform = "translate(-50%, -50%) scale(1)";
    });
  }

  if (closeWishBtn && wishModal) {
    closeWishBtn.addEventListener("click", function () {
      wishModal.style.transform = "translate(-50%, -50%) scale(0)";
    });
  }

  // --- Final Buttons Logic ---
  const saButton = document.querySelector(".sa");
  if (saButton) {
    saButton.addEventListener("click", function () {
      window.location.reload();
    });
  }
});
