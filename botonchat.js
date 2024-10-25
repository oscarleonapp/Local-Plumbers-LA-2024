(() => {
    "use strict";

    // Estilos iniciales para el botón de chat cerrado
    var initialStyles = {
        bottom: "20px",
        right: "20px",
        position: "fixed",
        width: "200px",
        height: "50px",
        background: "#ffffff",
        "box-shadow": "0px 4px 6px rgba(0, 0, 0, 0.1)",
        "border-radius": "10px",
        "z-index": "1200"
    };

    // Función para convertir estilos a cadena CSS
    const convertStylesToString = function(styles) {
        return Object.keys(styles)
            .map((key) => `${key}:${styles[key]}`)
            .join(";");
    };

    // Estilos para el botón de chat abierto
    var openStyles = {
        display: "block",
        width: "300px",
        height: "400px",
        "box-shadow": "0px 8px 16px rgba(0, 0, 0, 0.2)",
        "border-radius": "10px"
    };

    // Función para combinar estilos iniciales y abiertos
    var combinedStyles = function(isOpen) {
        return convertStylesToString(
            isOpen
                ? { ...initialStyles, ...openStyles, width: window.innerWidth < 600 ? "100%" : openStyles.width }
                : initialStyles
        );
    };

    // Configura el iFrame del chat
    var chatConfig = function() {
        var chatElement = document.getElementById("housecall-pro-chat-bubble");
        var iframe = document.createElement("iframe");
        iframe.id = "proChatIframe";
        var encodedURL = btoa(document.location.href);
        iframe.src =
            "https://messages.housecallpro.com/website_builder?fallback_url=" +
            encodedURL +
            (chatElement
                ? (function(element) {
                      var params = "";
                      var color = element.getAttribute("data-color");
                      if (color) params += "&color=" + btoa(color);
                      var organization = element.getAttribute("data-organization");
                      if (organization) params += "&organization=" + btoa(organization);
                      return params;
                  })(chatElement)
                : "");

        return [iframe, ["height: 100%", "width: 100%", "border: none", "overflow: hidden"]];
    };

    // Crea el contenedor del iFrame y aplica estilos
    var container, iframe, styleArray;
    [iframe, styleArray] = chatConfig();
    container = (function(element) {
        var div = document.createElement("div");
        div.id = "proChatIframeContainer";
        document.body.appendChild(div);
        div.appendChild(element);
        return div;
    })(iframe);

    // Configuración de estilos y eventos para el botón de chat
    (function(container, iframeAndStyles) {
        var iframe = iframeAndStyles[0],
            styles = iframeAndStyles[1];
        var isOpen = false;
        iframe.setAttribute("style", styles.join(";"));
        container.setAttribute("style", convertStylesToString(initialStyles));

        var updateWidth = function() {
            var iframeWindow = iframe.contentWindow;
            if (iframeWindow) iframeWindow.postMessage({ type: "setWindowWidth", payload: { width: window.innerWidth } }, iframe.src);
        };

        window.addEventListener("resize", function() {
            container.setAttribute("style", combinedStyles(isOpen));
            updateWidth();
        });

        window.addEventListener("message", function(event) {
            var data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
            switch (data.type) {
                case "toggleChat":
                    isOpen = data.open;
                    container.setAttribute("style", combinedStyles(data.open));
                    break;
                case "resizeListenersReady":
                    updateWidth();
                    break;
            }
        });
    })(container, [iframe, styleArray]);
})();
