import { ReactNode } from 'react';

import styles from './Drawer.module.scss'

enum DrawerDirection {
    up = 'up',
    down = 'down',
}

type Props = {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    direction?: DrawerDirection;
    onClick: () => void;
};

const Drawer = ({
    isOpen,
    title,
    children,
    direction = DrawerDirection.up,
    onClick,
}: Props) => {

    return (
        <div className={`${styles.drawer} ${styles[direction]} ${isOpen ? styles.open : ''}`}>
            <div className={styles.drawer__container}>
                <button type='button' className={styles.drawer__line_container} onClick={onClick}>
                    <div className={`${styles.drawer__line} ${isOpen ? styles.drawer__line_active : styles.drawer__line_disabled}`} />
                </button>
                <div className={styles.drawer__title_container}>
                    <p className={styles.drawer__title}>{title}</p>
                    <button className={styles.drawer__icon}/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Drawer
