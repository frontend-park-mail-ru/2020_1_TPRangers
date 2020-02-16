

export function createInput (item = {
    name: undefined,
    placeholder: undefined,
    type: undefined,
}) {
    const input = document.createElement('input');
    input.type = item.type;
    input.name = item.name;
    input.placeholder = item.placeholder;

    return input;
}



export function createFormButton(type, value) {
    const button = document.createElement('input');
    button.type = type;
    button.value = value;

    return button;
}