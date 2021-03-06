import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

const styles = StyleSheet.create({
	htmlView: { padding: 10 },
	mainView: { alignItems: 'center', justifyContent: 'center' },
});

// TODO: Add multi language support, load from backend (api module LEGALS with query LANGUAGE)

export default function PrivacyPolicyScreen() {
	const htmlText = `<span>
	<H3>Privacy Policy</H3>
	Effective date: March 6, 2021
	
	Telerank ("us", "we", or "our") operates the Telerank Application (the "Service").
	
	This screen informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
	
	We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
	
	<H3>Information Collection And Use</H3>
	We collect several different types of information for various purposes to provide and improve our Service to you.
	
	<H4>Types of Data Collected</H4>
	<b>Personal Data</b>
	
	While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
	
	Email address
	First name and last name
	Phone number
	Usage Data

	<b>Usage Data</b>
	
	We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), device type, operative system version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
	
	<H3>Use of Data</H3>
	Telerank uses the collected data for various purposes:
	
	To provide and maintain the Service
	To notify you about changes to our Service
	To allow you to participate in interactive features of our Service when you choose to do so
	To provide customer care and support
	To provide analysis or valuable information so that we can improve the Service
	To monitor the usage of the Service
	To detect, prevent and address technical issues

	<H3>Transfer Of Data</H3>
	Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
	
	If you are located outside Argentina and choose to provide information to us, please note that we transfer the data, including Personal Data, to Argentina and process it there.
	
	Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
	
	Telerank will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
	
	<H3>Disclosure Of Data</H3>
	<b>Legal Requirements</b>
	
	Telerank may disclose your Personal Data in the good faith belief that such action is necessary to:
	
	To comply with a legal obligation
	To protect and defend the rights or property of Telerank
	To prevent or investigate possible wrongdoing in connection with the Service
	To protect the personal safety of users of the Service or the public
	To protect against legal liability

	<H3>Security Of Data</H3>
	The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
	
	<H3>Service Providers</H3>
	We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
	
	These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
	
	<b>Analytics</b>
	
	We may use third-party Service Providers to monitor and analyze the use of our Service.
	
	<b>Google Analytics</b>
	
	Google Analytics is an analytics service offered by Google that tracks and reports app traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
	
	For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page <a href="https://policies.google.com/privacy">https://policies.google.com/privacy?hl=en</a>
	
	<H3>Links To Other Sites</H3>
	Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
	
	We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
	
	<H3>Children's Privacy</H3>
	Our Service does not address anyone under the age of 17 ("Children").
	
	We do not knowingly collect personally identifiable information from anyone under the age of 17. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
	
	<H3>Changes To This Privacy Policy</H3>
	We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
	
	We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.
	
	You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

	<h3>Contact Us</h3>
  If you have any questions about these Terms, please contact us.
</span>`;

	return (
		<ScrollView contentContainerStyle={styles.mainView}>
			<HTMLView value={htmlText} style={styles.htmlView} />
		</ScrollView>
	);
}
