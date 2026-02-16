// Ensure code runs after DOM bootstrap is loaded
    document.addEventListener('DOMContentLoaded', function () {
      // Dynamic navbar active state on page load and click
      const navLinks = document.querySelectorAll('.navbar-custom .nav-link');

      // Set active on page load based on current URL
      const currentPath = window.location.pathname.split('/').pop();
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'index.html' && href === './index.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Handle click events
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          // Remove active class from all links
          navLinks.forEach(nav => nav.classList.remove('active'));
          // Add active class to clicked link
          this.classList.add('active');
        });
      });

      // Sticky navbar on scroll
      const navbar = document.querySelector('.navbar-custom');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('sticky');
        else navbar.classList.remove('sticky');
      });

      // Section highlights on scroll
      const sections = document.querySelectorAll('section[id]');
      const scrollOffset = 100;

      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - scrollOffset;
          if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          if (href === `#${current}`) {
            link.classList.add('active');
          }
        });
      });

      // Floating Book Appointment Button
      const floatingBtn = document.createElement('button');
      floatingBtn.className = 'floating-book-btn';
      floatingBtn.innerHTML = '<i class="fas fa-calendar-plus"></i>';
      floatingBtn.setAttribute('data-bs-toggle', 'modal');
      floatingBtn.setAttribute('data-bs-target', '#bookModal');
      floatingBtn.setAttribute('aria-label', 'Book Appointment');
      document.body.appendChild(floatingBtn);

      // Initialize tooltips for social links
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });

      // Appointment form handling
      const appointmentForm = document.getElementById('appointmentForm');
      const successMessage = document.getElementById('successMessage');
      const bookModalEl = document.getElementById('bookModal');

      if (appointmentForm && successMessage && bookModalEl) {
        appointmentForm.addEventListener('submit', function (e) {
          e.preventDefault();

          // Basic front-end validation (optional)
          if (!appointmentForm.checkValidity()) {
            appointmentForm.reportValidity();
            return;
          }

          // Custom validation for date and time
          const dateInput = document.getElementById('date');
          const timeInput = document.getElementById('time');
          const selectedDate = new Date(dateInput.value);
          const selectedTime = timeInput.value;

          if (selectedTime) {
            const [hours, minutes] = selectedTime.split(':');
            selectedDate.setHours(hours, minutes);
          }

          const now = new Date();

          if (selectedDate <= now) {
            alert('Please select a date and time that is after the current time.');
            return;
          }

          // Simulate processing (disable submit to prevent double-click)
          const submitBtn = appointmentForm.querySelector('button[type="submit"]');
          submitBtn.disabled = true;
          submitBtn.textContent = 'Processing...';

          // Simulate a brief "server" delay then show success
          setTimeout(() => {
            // hide form, show success message
            appointmentForm.classList.add('d-none');
            successMessage.classList.remove('d-none');

            // re-enable button text and reset form values
            submitBtn.disabled = false;
            submitBtn.textContent = 'Confirm Appointment';
            appointmentForm.reset();
          }, 700);
        });

        // Reset modal to original state when modal is fully hidden
        bookModalEl.addEventListener('hidden.bs.modal', function () {
          // show form (in case it was hidden) and hide success box
          successMessage.classList.add('d-none');
          appointmentForm.classList.remove('d-none');

          // re-enable any disabled submit and restore text
          const submitBtn = appointmentForm.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Confirm Appointment';
          }
    });
  }

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
