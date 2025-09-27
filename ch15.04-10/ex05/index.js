customElements.define("inline-circle", class InlineCircle
    extends HTMLElement {
    connectedCallback() {
        this.style.display = "inline-block";
        this.style.borderRadius = "50%";
        this.style.borderStyle = "solid";
        this.style.borderColor = "black";
        // this.style.border = "solid black 1px";
        // this.style.borderWidth = "1px";
        if (!this.style.borderWidth) {
            this.style.borderWidth = "1px";
        }
        this.style.transform = "translateY(10%)";
        if (!this.style.width) {
            this.style.width = "0.8em";
            this.style.height = "0.8em";
        }
    }
    static get observedAttributes() {
        return ["diameter", "color", "border-width"];
    }
    // This callback is invoked when one of the attributes listed above
    // changes, either when the custom element is first parsed, or later.
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "diameter":
                // If the diameter attribute changes, update the size styles
                this.style.width = newValue;
                this.style.height = newValue;
                break;
            case "color":
                // If the color attribute changes, update the color styles
                console.log("hello color");
                this.style.backgroundColor = newValue;
                break;
            case "border-width": // 加えた属性
                console.log("hello border width");
                this.style.borderWidth = newValue;
                break;
        }
    }
    // Define JavaScript properties that correspond to the element's
    // attributes. These getters and setters just get and set the underlying
    // attributes. If a JavaScript property is set, that sets the attribute
    // which triggers a call to attributeChangedCallback() which updates
    // the element styles.
    get diameter() { return this.getAttribute("diameter"); }
    set diameter(diameter) {
        this.setAttribute("diameter",
            diameter);
    }
    get color() { return this.getAttribute("color"); }
    set color(color) { this.setAttribute("color", color); }
});