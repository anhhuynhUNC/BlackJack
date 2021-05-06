export function lbToggle1() {
    let style = document.getElementById('leaderboard').style;

    style.animationName = 'slideOut'
    style.animationDuration = '0.4s'
    style.right = '100';
    style.opacity = '0';

}

export function lbToggle2() {
    let style = document.getElementById('leaderboard').style;

    style.animationName = 'slideIn'
    style.animationDuration = '0.4s'
    style.opacity  ='1';
    style.right = '150px';
    
}