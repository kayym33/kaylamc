const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const copyEmailButtons = [document.getElementById('copyEmailHero'), document.getElementById('copyEmail')].filter(Boolean);
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const filterButtons = Array.from(document.querySelectorAll('.filter-button'));
const progressBar = document.querySelector('.progress-bar span');

const emailAddress = 'km@kaylamc.uk';

const savedTheme = localStorage.getItem('portfolio-theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

function applyTheme(theme) {
	root.dataset.theme = theme;
	localStorage.setItem('portfolio-theme', theme);
	if (themeToggle) {
		themeToggle.textContent = theme === 'light' ? 'Dark' : 'Light';
	}
}

applyTheme(initialTheme);

if (themeToggle) {
	themeToggle.addEventListener('click', () => {
		const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
		applyTheme(nextTheme);
	});
}

async function copyEmail() {
	try {
		await navigator.clipboard.writeText(emailAddress);
	} catch {
		const tempInput = document.createElement('input');
		tempInput.value = emailAddress;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand('copy');
		tempInput.remove();
	}
}

copyEmailButtons.forEach((button) => {
	button.addEventListener('click', async () => {
		await copyEmail();
		const originalLabel = button.textContent;
		button.textContent = 'Copied';
		window.setTimeout(() => {
			button.textContent = originalLabel;
		}, 1200);
	});
});

function setActiveFilter(activeFilter) {
	filterButtons.forEach((button) => {
		button.classList.toggle('is-active', button.dataset.filter === activeFilter);
	});

	projectCards.forEach((card) => {
		const tags = (card.dataset.tags || '').split(' ');
		const visible = activeFilter === 'all' || tags.includes(activeFilter);
		card.classList.toggle('is-hidden', !visible);
	});
}

filterButtons.forEach((button) => {
	button.addEventListener('click', () => setActiveFilter(button.dataset.filter || 'all'));
});

function updateScrollProgress() {
	if (!progressBar) return;
	const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
	const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
	progressBar.style.transform = `scaleX(${Math.min(progress, 1)})`;
}

let scrollFramePending = false;

function onScroll() {
	if (scrollFramePending) return;
	scrollFramePending = true;
	window.requestAnimationFrame(() => {
		updateScrollProgress();
		scrollFramePending = false;
	});
}

updateScrollProgress();
window.addEventListener('scroll', onScroll, { passive: true });

function activateNavLink() {
	const sections = Array.from(document.querySelectorAll('main section[id]'));
	const navLinks = Array.from(document.querySelectorAll('.site-nav a'));

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				navLinks.forEach((link) => {
					const isActive = link.getAttribute('href') === `#${entry.target.id}`;
					link.style.color = isActive ? 'var(--text)' : '';
				});
			});
		},
		{ threshold: 0.35 }
	);

	sections.forEach((section) => observer.observe(section));
}

activateNavLink();
