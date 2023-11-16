let exit = document.getElementById('sidebar-dropdown-name-exit');

document.getElementById('profile-full-name').onclick = function () {
    if (exit.style.display === 'none') {
        exit.style.display = 'block';
    } else {
        exit.style.display = 'none';
    }
}

mainSvgElement = document.querySelector('.main-svg');
mainSvgElement.style.fill = 'white';
