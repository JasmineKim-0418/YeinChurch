import { getActivePopups } from '@/lib/contentful';
import Popup from './Popup';
import styles from './Popup.module.css';

export const revalidate = 60;

export default async function PopupWrapper() {
    const popups = await getActivePopups();

    if (!popups || popups.length === 0) return null;

    return (
        <div className={styles.popupsContainer}>
            {popups.map((popup) => (
                <Popup key={popup.id} popup={popup} />
            ))}
        </div>
    );
}
