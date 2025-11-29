// Basic interactivity: nav toggle, smooth scroll, contact form handling, simple reveal on scroll
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  navToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'block';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close nav on mobile
        if(window.innerWidth < 900 && nav.style.display === 'block'){
          nav.style.display = '';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    })
  });

  // Simple form handler (no backend) - simulate success
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-message');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const email = form.email.value.trim();
    if(!email || !email.includes('@')){ msg.textContent = 'Please enter a valid email.'; msg.style.color='crimson'; return; }
    msg.style.color='green';
    msg.textContent = 'Thanks! We will reach out to you soon.';
    form.reset();
  });

  // Reveal on scroll (intersection observer)
  const revealElements = document.querySelectorAll('.feature-card, .plan, .test, .hero-copy');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('reveal');
    });
  }, {threshold: 0.15});
  revealElements.forEach(el=>io.observe(el));
});
