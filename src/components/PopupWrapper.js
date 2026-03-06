import { getActivePopup } from '@/lib/contentful';
import Popup from './Popup';

export const revalidate = 60;

export default async function PopupWrapper() {
    const popup = await getActivePopup();

    return <Popup popup={popup} />;
}
