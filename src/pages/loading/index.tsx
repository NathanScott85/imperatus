import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';

export const Loading = () => {
    return (
        <>
         <TopHeader />
            <Header background />
            <Navigation background />
            <div>Loading...</div>
        </>
    );
}