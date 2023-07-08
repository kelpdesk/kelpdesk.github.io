<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $recaptchaResponse = $_POST['g-recaptcha-response'];
  $secretKey = '6LdctqomAAAAAGjD3S3e2qPxvzQZIUNDwkoavT4h';

  // Verify the reCAPTCHA response
  $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
  $recaptchaData = http_build_query([
    'secret' => $secretKey,
    'response' => $recaptchaResponse,
    'remoteip' => $_SERVER['REMOTE_ADDR']
  ]);
  $recaptchaOptions = [
    'http' => [
      'method' => 'POST',
      'header' => 'Content-Type: application/x-www-form-urlencoded',
      'content' => $recaptchaData
    ]
  ];
  $recaptchaContext = stream_context_create($recaptchaOptions);
  $recaptchaResult = file_get_contents($recaptchaUrl, false, $recaptchaContext);
  $recaptchaResponseData = json_decode($recaptchaResult);

  if (!$recaptchaResponseData->success) {
    // reCAPTCHA verification failed
    die('Invalid CAPTCHA. Please try again.');
  }

  // Continue processing the form submission
  // Your existing code to send the email
}
?>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  // Customize the email subject and recipient
  $subject = 'New Message from katherynkelly.com';
  $recipient = 'herself@katherynkelly.com';

  // Build the email content
  $emailContent = "Name: $name\n";
  $emailContent .= "Email: $email\n";
  $emailContent .= "Message:\n$message";

  // Send the email
  $headers = 'From: ' . $email . "\r\n";
  $success = mail($recipient, $subject, $emailContent, $headers);

  // Return the response to the AJAX request
  if ($success) {
    echo 'success';
  } else {
    echo 'error';
  }
}
?>