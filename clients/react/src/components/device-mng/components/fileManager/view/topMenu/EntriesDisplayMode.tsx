import { FaTh, FaThList } from 'react-icons/fa';
import TopMenuButton from './TopMenuButton';

interface Props {
}

export default function EntriesDisplayMode(props: Props) {
    const { } = props;

    return (
        <div
            className={`@tw{
                bg-black/10 rounded-md

                flex flex-row
                justify-start items-stretch

                gap-2 px-2 py-2

            }`}
        >
            <TopMenuButton
                isActive={true}
                inactiveStyle='opacity-50'
            >
                <FaTh />
            </TopMenuButton>
            <TopMenuButton
                isActive={false}
                inactiveStyle='opacity-50'

            >
                <FaThList />
            </TopMenuButton>
        </div>
    );
}