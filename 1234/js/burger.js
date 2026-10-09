export default class BurgerMenu {
  constructor(config, headerFixedInstance = null) {
    this.config = config;
    this.burgerButton = document.querySelector(`.${config.BURGER}`);
    this.burgerMenu = document.querySelector(`.${config.HEADER_MENU}`);
    this.body = document.querySelector(`.${config.PAGE_BODY}`);
    this.main = document.querySelector(`.${config.MAIN}`);
    this.headerFixedInstance = headerFixedInstance;

    if (!this.burgerButton || !this.burgerMenu || !this.body) {
      throw new Error("Required DOM elements are missing.");
    }

    this.mediaQuery = window.matchMedia(`(max-width: ${config.BREAKPOINT}px)`);
    this.touchStartX = 0;

    this.onBurgerClick = () => this.setOpen(!this.isOpen());
    this.onBodyClick = this.onBodyClick.bind(this);
    this.onKeydown = (e) =>
      e.key === "Escape" && this.isOpen() && this.setOpen(false);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onMediaChange = () => this.manageEvents();

    this.manageEvents();
    this.mediaQuery.addEventListener("change", this.onMediaChange);
  }

  isOpen() {
    return this.burgerMenu.classList.contains(this.config.HEADER_MENU_OPEN);
  }

  manageEvents() {
    if (this.mediaQuery.matches) {
      this.initEvents();
    } else {
      this.removeEvents();
      this.setOpen(false);
    }
  }

  initEvents() {
    this.burgerButton.addEventListener("click", this.onBurgerClick);
    this.body.addEventListener("click", this.onBodyClick);
    document.addEventListener("keydown", this.onKeydown);
    this.burgerMenu.addEventListener("touchstart", this.onTouchStart, {
      passive: true,
    });
    this.burgerMenu.addEventListener("touchmove", this.onTouchMove, {
      passive: true,
    });
    this.burgerMenu.addEventListener("touchend", this.onTouchEnd);
  }

  removeEvents() {
    this.burgerButton.removeEventListener("click", this.onBurgerClick);
    this.body.removeEventListener("click", this.onBodyClick);
    document.removeEventListener("keydown", this.onKeydown);
    this.burgerMenu.removeEventListener("touchstart", this.onTouchStart);
    this.burgerMenu.removeEventListener("touchmove", this.onTouchMove);
    this.burgerMenu.removeEventListener("touchend", this.onTouchEnd);
  }

  // единая точка открытия/закрытия (вместо дублирования в onBurgerClick и hideBurgerMenu)
  setOpen(isOpen) {
    const { BURGER_OPEN, HEADER_MENU_OPEN, PAGE_BODY_NO_SCROLL, LABEL } =
      this.config;
    const wasOpen = this.isOpen();

    this.burgerButton.classList.toggle(BURGER_OPEN, isOpen);
    this.burgerButton.setAttribute("aria-expanded", String(isOpen));
    this.burgerButton.setAttribute(
      "aria-label",
      isOpen ? LABEL.CLOSE : LABEL.OPEN,
    );
    this.burgerMenu.classList.toggle(HEADER_MENU_OPEN, isOpen);
    this.body.classList.toggle(PAGE_BODY_NO_SCROLL, isOpen);

    if (this.main) this.main.style.pointerEvents = isOpen ? "none" : "";

    if (this.headerFixedInstance) {
      if (isOpen) this.headerFixedInstance.removeFixedClass();
      else if (wasOpen) this.headerFixedInstance.updateFixedClass();
    }
  }

  onBodyClick(event) {
    if (!this.isOpen()) return;
    const { target } = event;
    const isLink = target.closest(`.${this.config.MENU_LINK}`);
    const isOutside =
      !target.closest(`.${this.config.HEADER_MENU}`) &&
      !target.closest(`.${this.config.BURGER}`);

    if (isLink || isOutside) this.setOpen(false);
  }

  // свайп влево по панели закрывает меню
  onTouchStart(event) {
    this.touchStartX = event.changedTouches[0].clientX;
    this.burgerMenu.style.transition = "none";
  }

  onTouchMove(event) {
    const dx = Math.min(0, event.changedTouches[0].clientX - this.touchStartX);
    this.burgerMenu.style.transform = `translateX(${dx}px)`;
  }

  onTouchEnd(event) {
    const dx = event.changedTouches[0].clientX - this.touchStartX;
    this.burgerMenu.style.transition = "";
    this.burgerMenu.style.transform = "";
    if (dx < -70) this.setOpen(false);
  }
}
