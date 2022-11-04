import PageWrapper from './wrappers/wrapper-regularPage';
import Search from '../form-search.jsx';

export default function Index() {
    return (
        <PageWrapper>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: '1.5em'}}>
                <Search />
            </div>
        </PageWrapper>
    )
}