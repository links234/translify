import {UI} from "UI";
import {TextTranslationEntry} from "./TextTranslationEntry";
import {TextTranslation} from "../state/TextTranslationStore";


export class TextTranslationList extends UI.Element {
    render() {
        return [...'           '].map(x => <TextTranslationEntry translation={new TextTranslation()} />);
    }
}