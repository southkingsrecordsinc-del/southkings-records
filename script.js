const button=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');button.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
async function loadReleaseData() {
  try {
    const response = await fetch('data/releases.json');

    if (!response.ok) {
      throw new Error('Could not load release data');
    }

    const data = await response.json();
    console.log('SouthKings release data loaded:', data.releases);
  } catch (error) {
    console.error('SouthKings release data error:', error);
  }
}

loadReleaseData();
