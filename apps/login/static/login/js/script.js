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



function showDashboard(dashboardId) {
    const dashboardUrls = {
        dashboard1: 'https://app.powerbi.com/view?r=eyJrIjoiODk5NDQ2MmEtYjAzOC00OGYyLWEzN2ItMTgxOTc4MDI3OGM2IiwidCI6IjI5MjRkZjBiLTA2NDQtNDE4Zi1hOTQyLTNhMmI1NWFlNWI3MiJ9',
        dashboard2: 'https://app.powerbi.com/view?r=eyJrIjoiZmE0NWIzZGUtM2Q3MC00MDUyLWFiYWEtYTJhZjlmMDhjNjVhIiwidCI6IjI5MjRkZjBiLTA2NDQtNDE4Zi1hOTQyLTNhMmI1NWFlNWI3MiJ9',
        dashboard3: 'https://app.powerbi.com/view?r=eyJrIjoiNTdjZjQxZjktYWYzOS00ODA1LTg5YTgtZWVjMGEzYmNjOGFiIiwidCI6IjI5MjRkZjBiLTA2NDQtNDE4Zi1hOTQyLTNhMmI1NWFlNWI3MiJ9'
    };

    const iframe = document.getElementById('dashboard-iframe');
    const display = document.getElementById('dashboard-display');

    // Define o URL do dashboard no iframe
    iframe.src = dashboardUrls[dashboardId];

    // Exibe o bloco do dashboard
    display.style.display = 'block';
}

