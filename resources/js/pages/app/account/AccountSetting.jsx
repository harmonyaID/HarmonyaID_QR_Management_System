import { AppLayout } from "@/components/layouts/AppLayout"
import { AccountSettingSection } from "./components/AccountSettingSection"

const AccountSettingPage = () => {
    return (
        <AppLayout
            title="Account Settings"
        >
            <AccountSettingSection/>
        </AppLayout>
    )
}

export default AccountSettingPage
