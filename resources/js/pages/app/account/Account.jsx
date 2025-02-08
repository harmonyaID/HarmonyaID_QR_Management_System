import { AppLayout } from "@/components/layouts/AppLayout"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { AccountSection } from "./components/AccountSection"

const AccountPage = () => {
    return (
        <AppLayout
            title="Account"
        >
            <AccountSection/>
        </AppLayout>
    )
}

export default AccountPage
