interface Props {
}

const items = [
    { name: 'file-1', size: 9568 },
    { name: 'file-2', size: 9568 },
    { name: 'file-3', size: 9568 },
]

const buttonStyle = `@tw{
    px-4 py-2
    bg-white/10
    cursor-pointer
    text-base text-white

    rounded-md
    
    active:opacity-60
    hover:bg-white/30
    transition-[opacity_background]
}`;

export default function UploadList(props: Props) {
    const { } = props;

    return (
        <div
            className={`@tw{
                flex-1 w-full max-w-md
                border border-blue-500/10
                p-2
                flex flex-col
                justify-start items-stretch
                gap-2
            }`}
        >
            {items.map(i => (
                <div
                    key={i.name}
                    className={`@tw{
                        flex flex-row
                        justify-start items-center
                        gap-6
                        border border-red-500/10
                    }`}
                >
                    <div>{i.name}</div>
                    <div>{i.size}</div>
                    <div className='ml-auto'>
                        <button
                            className={buttonStyle}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}