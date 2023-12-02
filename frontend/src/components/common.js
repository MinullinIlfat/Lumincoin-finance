let exit = document.getElementById('sidebar-dropdown-name-exit');

document.getElementById('profile-full-name').onclick = function () {
    if (exit.style.display === 'block') {
        exit.style.display = 'none';
    } else {
        exit.style.display = 'block';
    }
}

mainSvgElement = document.querySelector('.main-svg');
mainSvgElement.style.fill = 'white';
