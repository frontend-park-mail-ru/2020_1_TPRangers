const profileTmpl = require('../templates/profile.pug');

export default function createProfile(
  parent,
  data = {
    user: {
      name: 'UserName',
      dateOfB: '00',
      monthOfB: '00',
      yearOfB: '0000',
      avatar: 'https://picsum.photos/200/300',
      isMe: false,
    },

    posts: [
      {
        postName: 'Default post name',
        textData:
          'Lorem Ipsum is simply dummy text of the printing and ' +
          'typesetting industry. Lorem Ipsum has been the industrys' +
          ' standard dummy text ever since the 1500s, when an unknown' +
          ' printer took a galley of type and scrambled it to make a type' +
          ' specimen book. It has survived not only five centuries, but also' +
          ' the leap into electronic typesetting, remaining essentially' +
          ' unchanged. It was popularised in the 1960s with the release of' +
          ' Letraset sheets containing Lorem Ipsum passages, and more recently' +
          ' with desktop publishing software like Aldus PageMaker including ' +
          'versions of Lorem Ipsum.',
        imageData: 'https://picsum.photos/200/300?grayscale',
      },
      {
        postName: 'Default post name',
        textData:
          'Lorem Ipsum is simply dummy text of the printing and ' +
          'typesetting industry. Lorem Ipsum has been the industrys' +
          ' standard dummy text ever since the 1500s, when an unknown' +
          ' printer took a galley of type and scrambled it to make a type' +
          ' specimen book. It has survived not only five centuries, but also' +
          ' the leap into electronic typesetting, remaining essentially' +
          ' unchanged. It was popularised in the 1960s with the release of' +
          ' Letraset sheets containing Lorem Ipsum passages, and more recently' +
          ' with desktop publishing software like Aldus PageMaker including ' +
          'versions of Lorem Ipsum.',
        imageData: 'https://picsum.photos/200/300?grayscale',
      },
      {
        postName: 'Default post name',
        textData:
          'Lorem Ipsum is simply dummy text of the printing and ' +
          'typesetting industry. Lorem Ipsum has been the industrys' +
          ' standard dummy text ever since the 1500s, when an unknown' +
          ' printer took a galley of type and scrambled it to make a type' +
          ' specimen book. It has survived not only five centuries, but also' +
          ' the leap into electronic typesetting, remaining essentially' +
          ' unchanged. It was popularised in the 1960s with the release of' +
          ' Letraset sheets containing Lorem Ipsum passages, and more recently' +
          ' with desktop publishing software like Aldus PageMaker including ' +
          'versions of Lorem Ipsum.',
        imageData: 'https://picsum.photos/200/300?grayscale',
      },
    ],
  },
) {
  parent.innerHTML = '';

  parent.innerHTML += profileTmpl(data);
}
