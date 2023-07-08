$(document).ready(function() {
    // Smooth scrolling to section when a nav item is clicked
    $('nav a').on('click', function(event) {
      event.preventDefault();
      var target = $(this).attr('href');
      var offset = $(target).offset().top - 150;
      $('html, body').animate({
        scrollTop: offset
      }, 1500, 'swing'); //specify the easing function here
    });
  
    // Add or remove 'active' class based on section visibility
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
  
      $('section').each(function() {
        var sectionTop = $(this).offset().top - 150;
        var sectionBottom = sectionTop + $(this).outerHeight();
        var sectionId = $(this).attr('id');
        var navLink = $('#navbar ul li a[href="#' + sectionId + '"]');
  
        if (scroll >= sectionTop && scroll < sectionBottom) {
          navLink.addClass('active');
          document.title = 'Katheryn Kelly - ' + sectionId;
        } else {
          navLink.removeClass('active');
        }
      });
    });
  
    // Function to load content from text files into sections
    function loadSectionContent(sectionId, fileName) {
      $.ajax({
        url: fileName,
        dataType: 'text',
        success: function(content) {
          var formattedContent = content.replace(/\n/g, '<br>');
          $('#' + sectionId).html('<h2>' + sectionId.charAt(0).toUpperCase() + sectionId.slice(1) + '</h2><p>' + formattedContent + '</p>');
        },
        error: function(xhr, status, error) {
          console.error('Error loading section content:', error);
        }
      });
    }
  
    // Load content from text files into sections
    loadSectionContent('about', 'txt/about.txt');
    loadSectionContent('skills', 'txt/skills.txt');
    loadSectionContent('experience', 'txt/experience.txt');
    loadSectionContent('education', 'txt/education.txt');
    loadSectionContent('contact', 'txt/contact.txt');
  });

  $(document).ready(function() {
    $('#contactForm').submit(function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      var form = $(this);
      var url = form.attr('action');
      var formData = form.serialize(); // Serialize form data to send
  
      // Send an AJAX request to the server-side script
      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        success: function(response) {
          // Display a success message
          $('#responseMessage').text('Your message has been sent. Thank you!');
          form[0].reset(); // Reset the form fields
        },
        error: function(xhr, status, error) {
          // Display an error message
          $('#responseMessage').text('An error occurred while sending your message.');
        }
      });
    });
  });

  // reCAPTCHA 
  function onSubmit(token) {
    document.getElementById("contactForm").submit();
  }

