function toggleYear(btn) {
  const open = btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.nextElementSibling.classList.toggle('open');
}

function toggleMod(head) {
  const chev = head.querySelector('.mod-chev');
  const files = head.nextElementSibling;
  const open = chev.classList.toggle('open');
  head.setAttribute('aria-expanded', open);
  files.classList.toggle('open');
}

document.querySelectorAll('.mod-head').forEach(function(head) {
  head.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMod(head);
    }
  });
});
