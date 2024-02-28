import { format } from 'date-fns';

interface Props {
    children: Date;
    formatString: string;
}

export default function DateText(props: Props) {
    const { children, formatString } = props;

    return (
        <>
            {format(children, formatString)}
        </>
    );
}