import createLinks from "./createLinks.js";

const backButton = {
        name: 'Назад',
        link: "main",
        cl: 'back_link',
    };

export default function createBackButton() {
    const button = createLinks(backButton);
    return button;
}