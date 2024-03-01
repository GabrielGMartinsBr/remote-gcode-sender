import { twMerge } from 'tailwind-merge';

type Props = JSX.IntrinsicElements['button'] & {
    isActive?: boolean;
    activeStyle?: string;
    inactiveStyle?: string;
}

export default function TopMenuButton(props: Props) {
    const { isActive, className, activeStyle, inactiveStyle } = props;

    let _className = className;
    if (isActive && activeStyle) {
        _className = twMerge(className, activeStyle);
    } else if (!isActive && inactiveStyle) {
        _className = twMerge(className, inactiveStyle);
    }

    const propsToBind = {
        ...props,
        isActive: undefined,
        activeStyle: undefined,
        inactiveStyle: undefined,
        className: _className
    };

    return (
        <button
            {...propsToBind}
        />
    );
}