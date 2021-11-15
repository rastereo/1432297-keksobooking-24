const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const avatarFile = avatarChooser.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  const checkAvatarType = FILE_TYPES.some((it) => avatarFileName.endsWith(it));

  if (checkAvatarType) {
    avatarPreview.src = URL.createObjectURL(avatarFile);
  }
});

photoChooser.addEventListener('change', () => {
  const photoFile = photoChooser.files[0];
  const photoFileName = photoFile.name.toLowerCase();

  if (photoPreview.childNodes.length > 0) {
    photoPreview.lastChild.remove();
  }

  const checkPhotoType = FILE_TYPES.some((it) => photoFileName.endsWith(it));

  if (checkPhotoType) {
    const addPhoto = document.createElement('img');
    addPhoto.width = '70';
    addPhoto.height = '70';
    addPhoto.alt = 'Фотография жилья';
    addPhoto.src = URL.createObjectURL(photoFile);
    photoPreview.append(addPhoto);
  }
});

const resetUpload = () => {
  avatarPreview.src = 'img/muffin-grey.svg';

  if (photoPreview.childNodes.length > 0) {
    photoPreview.lastChild.remove();
  }
};

export { resetUpload };
