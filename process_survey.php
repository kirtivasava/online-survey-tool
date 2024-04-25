<?php
// process_survey.php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Process survey data received from the form
    $name = $_POST['name'];
    $question = $_POST['question'];
    $options = [];

    foreach ($_POST as $key => $value) {
        if (strpos($key, 'option') === 0) {
            $options[] = $value;
        }
    }

    // Format survey response
    $response = "Name: $name\n";
    $response .= "Question: $question\n";
    $response .= "Options:\n";
    foreach ($options as $option) {
        $response .= "- $option\n";
    }
    $response .= "---------------------\n";

    // Store survey response in a text file
    $file = 'survey_responses.txt';
    file_put_contents($file, $response, FILE_APPEND | LOCK_EX);

    // Respond with success message
    echo "Survey response stored successfully!";
} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo "Invalid request method";
}
?>
