import EntriesDisplayMode from './EntriesDisplayMode';
import SearchField from './SearchField';

interface Props {
}

export default function FilesTopMenu(props: Props) {
    const { } = props;

    return (
        <div className={`@tw{
            p-3 mb-4

            bg-white/10

            flex flex-row
            justify-start items-stretch
            gap-2

        }`}>

            <SearchField />

            <EntriesDisplayMode />
            
        </div>
    );
}