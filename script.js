const button=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');button.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
async function loadReleaseData() {
  try {
    const response = await fetch('data/releases.json');

    if (!response.ok) {
      throw new Error('Could not load release data');
    }

    const data = await response.json();
 const releaseGrid = document.querySelector('#release-grid');

if (!releaseGrid) return;

const today = new Date();
today.setHours(0, 0, 0, 0);

releaseGrid.innerHTML = data.releases.map(release => {
  const releaseDate = new Date(`${release.releaseDate}T00:00:00`);
  const isReleased = releaseDate <= today;

  const dateLabel = isReleased
    ? 'OUT NOW'
    : releaseDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).toUpperCase();

  return `
    <article class="release">
      <div class="cover">
        <img src="${release.cover}" alt="${release.title} by ${release.artist}">
      </div>
      <p class="meta">${release.artist} · ${dateLabel}</p>
      <h3>${release.title}</h3>
    <p>${release.featured ? 'Latest Single' : isReleased ? 'Single' : 'Upcoming Single'}</p>
    </article>
  `;
}).join('');
  } catch (error) {
    console.error('SouthKings release data error:', error);
  }
}

loadReleaseData();
