const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const hamburgerIcon = menuBtn.querySelector('.hamburger-icon');
const closeIcon = menuBtn.querySelector('.close-icon');

if (menuBtn && sidebar && hamburgerIcon && closeIcon) {
    menuBtn.addEventListener('click', () => {
        const isActive = sidebar.classList.contains('active');
        if (isActive) {
            sidebar.classList.remove('active');
            hamburgerIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            menuBtn.setAttribute('aria-label', 'Open menu');
            sidebar.setAttribute('aria-hidden', 'true');
        } else {
            sidebar.classList.add('active');
            hamburgerIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            menuBtn.setAttribute('aria-label', 'Close menu');
            sidebar.setAttribute('aria-hidden', 'false');
        }
    });
}

// Contact form submission
// const contactForm = document.getElementById('contactForm');
// if (contactForm) {
//     contactForm.addEventListener('submit', (event) => {
//         event.preventDefault();
//         alert('Thank you for contacting us!');
//         contactForm.reset();
//     });
// }
try{
    const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');
    if(!form){
        throw new Error("Contact form not found"); 
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
    
        fetch('https://script.google.com/macros/s/AKfycbwCPH-hoMHIuYZaCfX661fgwPVFfN4s2v-R0v1zQNKPcv2nb7wC6K4tPY2vMjurU2Lh/exec', {
            method: 'POST',
            body: formData
        })
            .then(res => res.text())
            .then(() => {
                responseMessage.textContent = 'Thank you for contacting us! we will get back to you soon.';
                responseMessage.style.color = 'lightgreen';
                form.reset();
                console.log("Form submitted successfully");
            })
            .catch(() => {
                responseMessage.textContent = 'Network error. Please try again later.';
                responseMessage.style.color = 'red';
            });
    });
}catch(e){
    console.error("no contact form found", e);
}
const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');

    // Resize canvas to full screen
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const stars = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5,
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < starCount; i++) {
        const s = stars[i];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${s.alpha})`; // Gold color
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      }
      requestAnimationFrame(animate);
    }

    animate();