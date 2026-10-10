document.querySelector('[data-print]')?.addEventListener('click', () => window.print());

document.querySelectorAll('[data-gallery]').forEach(gallery => {
  const image = gallery.querySelector('[data-gallery-image]');
  const caption = gallery.querySelector('[data-gallery-caption]');
  const count = gallery.querySelector('[data-gallery-count]');
  const fullSizeLinks = gallery.querySelectorAll('[data-gallery-full]');
  const buttons = [...gallery.querySelectorAll('[data-gallery-photo]')];
  if (!image || !caption || !count || !buttons.length) return;

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      image.src = button.dataset.src;
      image.alt = button.dataset.alt;
      image.width = Number(button.dataset.width);
      image.height = Number(button.dataset.height);
      caption.textContent = button.dataset.caption;
      count.textContent = `${index + 1} / ${buttons.length}`;
      fullSizeLinks.forEach(link => { link.href = button.dataset.src; });
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  });
});

// Publication rows: "Abs" reveals the summary; "N more authors" swaps in the full author list.
document.querySelectorAll('[data-toggle-abs]').forEach(button => {
  button.addEventListener('click', () => {
    const abstract = button.closest('.pub-body')?.querySelector('.pub-abstract');
    if (!abstract) return;
    abstract.hidden = !abstract.hidden;
    button.setAttribute('aria-expanded', String(!abstract.hidden));
  });
});
document.querySelectorAll('[data-more-authors]').forEach(button => {
  button.addEventListener('click', () => {
    const wrapper = button.closest('.pub-authors');
    wrapper?.querySelector('.authors-short')?.setAttribute('hidden', '');
    wrapper?.querySelector('.authors-full')?.removeAttribute('hidden');
  });
});
