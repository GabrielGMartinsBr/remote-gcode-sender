import { FaSearch } from 'react-icons/fa';

interface Props {
}

export default function SearchField(props: Props) {
    const { } = props;

    return (
        <div
            className={`@tw{
                group
                w-full max-w-md

                border-[1.5px] border-white/10
                rounded
                focus-within:border-white/60

                flex flex-row

                h-12
            }`}
        >
            <input
                className={`@tw{
                    block w-full

                    bg-transparent
                    px-2

                    outline-none

                    font-medium text-lg
                }`}
                type='text'
                placeholder='Search file'
                spellCheck={false}
            />

            <button
                className={`@tw{
                    block

                    group-focus-within:bg-white/20
                }`}
            >
                <FaSearch />
            </button>
        </div>
    );
}