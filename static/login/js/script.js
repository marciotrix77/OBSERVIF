const menuLateral = document.querySelector('.menu-lateral');
const menuToggle = document.querySelector('.menu-toggle');
const menuItems = document.querySelectorAll('.menu-lateral nav ul li.has-tooltip');

menuToggle.addEventListener('click', () => {
    menuLateral.classList.toggle('recolhido');

    // Adiciona ou remove a classe 'show-tooltip' com base no estado do menu
    menuItems.forEach(item => {
        if (menuLateral.classList.contains('recolhido')) {
            item.addEventListener('mouseenter', showTooltip);
            item.addEventListener('mouseleave', hideTooltip);
        } else {
            item.removeEventListener('mouseenter', showTooltip);
            item.removeEventListener('mouseleave', hideTooltip);
            hideTooltip.call(item); // Garante que o tooltip seja escondido se estiver visível
        }
    });
});

function showTooltip() {
    this.classList.add('show-tooltip');
}

function hideTooltip() {
    this.classList.remove('show-tooltip');
}

const myModal = document.getElementById('exampleModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})
