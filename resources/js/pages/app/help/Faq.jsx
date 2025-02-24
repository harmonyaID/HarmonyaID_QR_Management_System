import { AppLayout } from "@/components/layouts/AppLayout"
import { FaqSearchProvider } from "./components/FaqSearchForm"
import { FaqList } from "./components/FaqList"

const FaqPage = () => (
    <AppLayout
        title="Frequently Asked Question"
    >
        <FaqSearchProvider>
            <FaqList/>
        </FaqSearchProvider>
    </AppLayout>
)

export default FaqPage