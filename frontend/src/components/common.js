let exit = document.getElementById('sidebar-dropdown-name-exit');

document.getElementById('dropdown-name').onclick = function () {
    if (exit.style.display === 'none') {
        exit.style.display = 'block';
    } else {
        exit.style.display = 'none';
    }
}