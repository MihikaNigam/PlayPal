import {
    PageParts,
    renderWithDefaults
} from "@calpoly/mustang/server";

const defaults = {
    stylesheets: [
        "/styles/reset.css",
        "/styles/tokens.css",
        "/styles/page.css"
    ],
    styles: [],
    scripts: [
        `
        import { define } from "@calpoly/mustang";
        import { HeaderElement } from "/scripts/pp_header.js";
        define({
            "pp-header": HeaderElement,
        });
        HeaderElement.initializeOnce();
        `
    ],
    googleFontURL:
        "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    // "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,400;0,700;1,700&family=Merriweather:wght",
    imports: {
        "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang"
    }
};

export default function renderPage(page: PageParts) {
    return renderWithDefaults(page, defaults);
}