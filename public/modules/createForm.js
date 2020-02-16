function createInput (item = {
    title: 'Не определено',
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

function createTitle(title) {
    const div =  document.createElement('div');
    const span = document.createElement('span');
    span.innerText = title;
    div.appendChild(span);
    return div;
}



function createFormButton(type, value) {
    const button = document.createElement('input');
    button.type = type;
    button.value = value;

    return button;
}

export function createDefaultForm (formItems = {
    by_default: {
        placeholder: undefined,
        name: undefined,
        type: undefined}
}) {
    const form = document.createElement('form');
    Object.values(formItems).forEach( (item) => {
        const title = createTitle(item.title );
        form.appendChild(title);
        const input = createInput(item);
        form.appendChild(input);
    });
    const submit = createFormButton('submit', 'Войти');
    form.appendChild(submit);
    form.action = '#';
    return form;
}


