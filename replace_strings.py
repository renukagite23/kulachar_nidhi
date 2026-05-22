import re
import sys

def modify_profile(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add import
    if "import { useLanguage }" not in content:
        import_stmt = "import { useLanguage } from '@/lib/LanguageContext';\n"
        content = re.sub(r"(import .*? 'react';)", r"\1\n" + import_stmt, content)

    # Add hook to ProfilePage
    if "const { t } = useLanguage();" not in content.split("export default function ProfilePage()")[1].split("return")[0]:
        content = re.sub(r"(export default function ProfilePage\(\) \{)", r"\1\n  const { t } = useLanguage();", content)

    # Add hook to NotificationsTab
    if "const { t } = useLanguage();" not in content.split("const NotificationsTab")[1].split("return")[0]:
        content = re.sub(r"(const NotificationsTab = \(\) => \{)", r"\1\n  const { t } = useLanguage();", content)

    # Dictionary of exact string replacements
    replacements = {
        r"Devotee of Kuldaivat Trust": r"{t('profile.devotee')}",
        r">Edit Profile<": r">{t('profile.edit_profile')}<",
        r"> Profile": r"> {t('profile.profile_tab')}",
        r"> Notifications<": r"> {t('profile.notifications_tab')}<",
        r">Personal Information<": r">{t('profile.personal_info')}<",
        r">Email Identity<": r">{t('profile.email_identity')}<",
        r">Contact Number<": r">{t('profile.contact_number')}<",
        r">Date of Birth<": r">{t('profile.dob')}<",
        r">Role Access<": r">{t('profile.role_access')}<",
        r">City / Village<": r">{t('profile.city_village')}<",
        r">Pincode<": r">{t('profile.pincode')}<",
        r">Joined Date<": r">{t('profile.joined_date')}<",
        r"'Not Provided'": r"t('profile.not_provided')",
        r"Not Provided": r"{t('profile.not_provided')}",
        r"> Family Members": r"> {t('profile.family_members')}",
        r">Donation Summary<": r">{t('profile.donation_summary')}<",
        r">Lifetime Charity Contribution<": r">{t('profile.lifetime_charity')}<",
        r">View History<": r">{t('profile.view_history')}<",
        r">Quick Links<": r">{t('profile.quick_links')}<",
        r"> Security Settings": r"> {t('profile.security_settings')}",
        r"> Notification Preferences": r"> {t('profile.notification_prefs')}",
        r"> Legal & Terms": r"> {t('profile.legal_terms')}",
        r"Loading notifications\.\.\.": r"{t('profile.loading_notifications')}",
        r">No Notifications<": r">{t('profile.no_notifications')}<",
        r"You're all caught up!": r"{t('profile.all_caught_up')}",
        r">Full Name<": r">{t('profile.full_name')}<",
        r">Email Address<": r">{t('profile.email_address')}<",
        r">Phone Number<": r">{t('profile.phone_number')}<",
        r"> Add Member": r"> {t('profile.add_member')}",
        r"placeholder=\"Name \(Required\)\"": r"placeholder={t('profile.name_required')}",
        r"placeholder=\"Mobile Number\"": r"placeholder={t('profile.mobile_number')}",
        r"No family members added yet\.": r"{t('profile.no_family_added')}",
        r">Cancel<": r">{t('profile.cancel')}<",
        r"Save Profile": r"{t('profile.save_profile')}",
        r"placeholder=\"Enter your full name\"": r"placeholder={t('profile.enter_full_name')}",
        r"placeholder=\"Enter your email address\"": r"placeholder={t('profile.enter_email')}",
        r"placeholder=\"Enter your phone number\"": r"placeholder={t('profile.enter_phone')}",
        r"placeholder=\"Enter City or Village\"": r"placeholder={t('profile.enter_city')}",
        r"placeholder=\"Enter 6-digit Pincode\"": r"placeholder={t('profile.enter_pincode')}"
    }

    # Manual fixes for JSX text nodes
    for old, new in replacements.items():
        content = re.sub(old, new, content)

    # Some missed elements because of spacing differences:
    # "Family Members" might be ">Family Members" or "> Family Members<"
    content = content.replace("Family Members <Users", "{t('profile.family_members')} <Users")
    content = content.replace("placeholder=\"Email Address\"", "placeholder={t('profile.email_address')}")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
if __name__ == '__main__':
    modify_profile(sys.argv[1])
