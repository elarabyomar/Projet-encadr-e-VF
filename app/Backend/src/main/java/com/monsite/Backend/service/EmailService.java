package com.monsite.Backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender emailSender;

    public void envoyerEmailAcceptation(String destinataire, String nom, String prenom) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(destinataire);
        message.setSubject("Acceptation de votre demande d'inscription");
        message.setText("Cher(e) " + prenom + " " + nom + ",\n\n" +
                "Nous avons le plaisir de vous informer que votre demande d'inscription a été acceptée. " +
                "Vous pouvez maintenant vous connecter à votre compte avec votre email et mot de passe.\n\n" +
                "Cordialement,\n" +
                "L'équipe administrative");
        
        emailSender.send(message);
    }

    public void envoyerEmailRefus(String destinataire, String nom, String prenom) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(destinataire);
        message.setSubject("Réponse concernant votre demande d'inscription");
        message.setText("Cher(e) " + prenom + " " + nom + ",\n\n" +
                "Nous regrettons de vous informer que votre demande d'inscription n'a pas été retenue. " +
                "Pour plus d'informations, veuillez contacter notre administration.\n\n" +
                "Cordialement,\n" +
                "L'équipe administrative");
        
        emailSender.send(message);
    }
}