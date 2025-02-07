import { AppLayout } from "@/components/layouts/AppLayout"
import { UsageCategoryFormProvider } from "./components/UsageCategoryForm"
import { DropboxProvider } from "@/components/inputs/Dropbox"
import { UsageCategorySection } from "./components/UsageCategorySection"
import { SearchFormProvider } from "@/components/forms/SearchForm"

const UsageCategoryPage = () => {
    return (
        <AppLayout
            title="Usage Category"
        >
            <UsageCategoryFormProvider>
                <SearchFormProvider>
                    <DropboxProvider>
                        <UsageCategorySection/>
                    </DropboxProvider>
                </SearchFormProvider>
            </UsageCategoryFormProvider>
        </AppLayout>
    )
}

export default UsageCategoryPage
