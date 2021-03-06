import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

const styles = StyleSheet.create({
	htmlView: { padding: 10 },
	mainView: { alignItems: 'center', justifyContent: 'center' },
});

// TODO: Add multi language support, load from backend (api module LEGALS with query LANGUAGE)

export default function TermsOfServiceScreen() {
	const htmlText = `<span>
  <h3>Terms of Service ("Terms")</h3>
  Last updated: March 6, 2021
  
  Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Telerank application (the "Service") operated by "Battlemark" ("us", "we", or "our").
  
  Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
  
  By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
  
  <h3>Accounts</h3>
  When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
  
  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
  
  You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
  
  <h3>Usage Restrictions</h3>
  By creating an account with us, you accept our Privacy Policy and agree don't use our services for the following purposes:
  
  <ul>
    <li>Using our service for spam or scam.</li>
    <li>Promoting violence on your Telegram channels, bots, etc that listed on our application.</li>
    <li>Posting pornographic content on your Telegram channels, bots, etc that listed on our application.</li>
    <li>Using our service for promoting illegal content.</li>
    <li>Promoting the same service or channel as Telerank</li>
  </ul>
  <h3>Refunds</h3>
  We do not issue refunds for our services once the order is confirmed and the service be enabled.
  
  We recommend contacting us for assistance if you experience any issues about our services.
  
  <h3>Links To Other Web Sites</h3>
  Our Service may contain links to third-party web sites or services that are not owned or controlled by "Telerank".
  
  "Telerank" has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that "Telerank" shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
  
  We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
  
  <h3>Termination</h3>
  We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
  
  All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
  
  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
  
  Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
  
  All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
  
  <h3>Governing Law</h3>
  These Terms shall be governed and construed in accordance with the laws of Argentina, without regard to its conflict of law provisions.
  
  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
  
  <h3>Changes</h3>
  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 15 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
  
  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
  
  <h3>Contact Us</h3>
  If you have any questions about these Terms, please contact us.
  
  We reserve the right to update these Terms of Service later.
</span>`;

	return (
		<ScrollView contentContainerStyle={styles.mainView}>
			<HTMLView value={htmlText} style={styles.htmlView} />
		</ScrollView>
	);
}
