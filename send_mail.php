<?php

########### CONFIG ###############

// $recipient = 'halim.majda@gmail.com';
$redirect = 'resetPassword.html?msg=Email sent, check your Inbox.';

########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $email = $_POST['email'];

        $message = "Hello,\n 
        \nFollow this link to reset your JOIN password for your " . $email . " account.\n
        \nhttps://gruppe-384.developerakademie.net/resetPassword2.html?msg=" . $email . "\n
        \nIf you didn't ask to reset your password, you can ignore this email.\n
        \nThanks,\n
        \nYour Join team\n";

        $recipient = $email;
        $subject = "Reset your password for JOIN App";
        $headers = "From: noreply@https://gruppe-384.developerakademie.net/index.html";

        $result = mail($recipient, $subject, $message, $headers);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
