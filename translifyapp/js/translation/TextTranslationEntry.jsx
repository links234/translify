import {UI, Panel, StyleSheet, styleRule, registerStyle, Image} from "UI";


class TextTranslationEntryStyle extends StyleSheet {
    @styleRule
    panel = {
        background: "white",
        width: "80vh",
        maxHeight: "400px",
        display: "flex",
        flexDirection: "column",
        padding: "10px 20px",
        boxShadow: "1px 1px 6px rgba(0,0,0,.5)",
        margin: "20px",
        borderRadius: "6px"
    };

    @styleRule
    title = {
        fontSize: "2em",
        textAlign: "center",
    };

    @styleRule
    contentContainer = {
        display: "flex",
        padding: "20px 0",
        flexDirection: "row",
        ">*": {
            flex: "1",
        },
        flex: "1",
    };

    @styleRule
    imageContainer = {
        textAlign: "center",
    };

    @styleRule
    image = {
        borderRadius: "4px",
        height: "100%",
    };

    @styleRule
    textContainer = {
        overflow: "auto",
    };

    @styleRule
    text = {
        color: "rgba(0,0,0,.8)",
        textAlign: "justify",
    };
}


@registerStyle(TextTranslationEntryStyle)
export class TextTranslationEntry extends Panel {
    extraNodeAttributes(attr) {
        super.extraNodeAttributes(attr);
        attr.addClass(this.styleSheet.panel);
    }

    render() {
        const [title, content, photoUrl] = ["getTitle", "getContent", "getPhotoUrl"].map(
            func => this.options.translation[func]());
        const {styleSheet} = this;
        return [
            <div className={styleSheet.title}>{title}</div>,
            <div className={styleSheet.contentContainer}>
                <div className={styleSheet.imageContainer}>
                    <Image className={styleSheet.image} src={photoUrl}/>
                </div>
                <div className={styleSheet.textContainer}>
                    <div className={styleSheet.text}>{content}</div>
                </div>
            </div>
        ];
    }
}