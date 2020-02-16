import createLinks from "./createLinks.js";

const backButton = {
    login: {
        name: 'Назад',
        link: "main",
        cl: 'back_link',
    },
};

export default function createBackButton(parent) {
    const button = createLinks(backButton);
    return button;
}