// los modasl
export function initModal() {
  const openBtn = document.getElementById('open-video');
  const dialog = document.getElementById('dialog');
  const closeBtn = dialog.querySelector('.modal-close');

  function open() {
    dialog.setAttribute('aria-hidden','false');
    dialog.querySelector('.modal-close').focus();
    document.body.style.overflow = 'hidden';
  }
  function close() {
    dialog.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialog.getAttribute('aria-hidden') === 'false') {
      close();
    }
  });
}
