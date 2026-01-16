customElements.define(
  "inline-circle",
  class InlineCircle extends HTMLElement {
    // カスタム要素のインスタンスがドキュメントに挿入されると呼び出される
    connectedCallback() {
      this.style.display = "inline-block";
      this.style.borderRadius = "50%";
      this.style.borderStyle = "solid";
      this.style.borderColor = "black";
      if (!this.style.borderWidth) {
        this.style.borderWidth = "1px";
      }
      this.style.transform = "translateY(10%)";
      if (!this.style.width) {
        this.style.width = "0.8em";
        this.style.height = "0.8em";
      }
    }
    // この属性が変化した時にattributeChangedCallback()が呼び出される
    static get observedAttributes() {
      return ["diameter", "color", "border-width"];
    }
    // 上で指定した属性が変化した時に呼び出される
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "diameter":
          this.style.width = newValue;
          this.style.height = newValue;
          break;
        case "color":
          console.log("hello color");
          this.style.backgroundColor = newValue;
          break;
        case "border-width": // ボーダー線幅の属性を追加
          console.log("hello border width");
          this.style.borderWidth = newValue;
          break;
      }
    }
    get diameter() {
      return this.getAttribute("diameter");
    }
    set diameter(diameter) {
      this.setAttribute("diameter", diameter);
    }
    get color() {
      return this.getAttribute("color");
    }
    set color(color) {
      this.setAttribute("color", color);
    }
  },
);
