public with sharing class ContactController {

    @AuraEnabled(cacheable=true)
    public static List<EmailMessage> getEmails(String conId) {
        return [
            SELECT Id, FromAddress, TextBody, Subject, ToAddress
            FROM EmailMessage
        ];
    }
}