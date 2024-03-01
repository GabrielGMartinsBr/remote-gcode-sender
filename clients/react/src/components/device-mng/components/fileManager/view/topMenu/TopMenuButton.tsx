import { twMerge } from 'tailwind-merge';

type Props = JSX.IntrinsicElements['button'] & {
    isActive?: boolean;
    activeStyle?: string;
    inactiveStyle?: string;
}

export default function TopMenuButton(props: Props) {
    const { isActive, className, activeStyle, inactiveStyle } = props;

    const baseStyle = `@tw{
        transition-opacity
    }`;

    let _className = twMerge(baseStyle, className);
    if (isActive && activeStyle) {
        _className = twMerge(className, activeStyle);
    } else if (!isActive && inactiveStyle) {
        _className = twMerge(className, inactiveStyle);
    }

    const propsToBind = { ...props };

    delete propsToBind.isActive;
    delete propsToBind.inactiveStyle;
    delete propsToBind.activeStyle;

    return (
        <button
            {...propsToBind}
            className={_className}
        />
    );
}