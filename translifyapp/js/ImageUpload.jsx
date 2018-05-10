import {UI, FileInput, NumberInput, Button, Level} from "UI";
import {Ajax} from "Ajax";

class Canvas extends UI.Element {
    getNodeType() {
        return "canvas";
    }

    getContext2D() {
        return this.node.getContext("2d");
    }
}

function ResizeImage(image, options) {
    options.maxWidth = options.maxWidth || image.width;
    options.maxHeight = options.maxHeight || image.height;
    options.maxSize = options.maxSize || (1 << 25); //Image size
}

export class ImageUpload extends UI.Element {
    extraNodeAttributes(attr) {
        super.extraNodeAttributes(attr);
        attr.setStyle("display", "inline-block");
    }

    render() {
        return [
            <Button className="pull-left" level={Level.INFO} label="Import"
                           style={{position: "relative", overflow: "hidden", display: "block", marginRight: "10px"}}>
                    <FileInput ref="imageInput" fileTypes=".jpg,.jpeg,.png" style={{position: "absolute", top: "0",
                        right: "0", margin: "0", padding: "0", cursor: "pointer", opacity: "0", filter: "alpha(opacity=0)"}}/>
            </Button>,
            <NumberInput style={{display: "none"}} ref="imageQualityInput" value="1" min="0" max="1" step="0.1" placeholder="quality" />,
            <Button label="Upload" style={{display: "block"}} onClick={() => this.uploadImage()} />,
            <div ref="finalURL"/>,
            <div style={{display: "none"}} ref="preview"/>,
            <img ref="compressedImage" style={{display: "none"}}/>
        ];
    }

    onMount() {
        this.imageInput.addChangeListener(() => {
            if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                console.error('The File APIs are not fully supported in this browser.');
                return false;
            }
            this.finalURL.eraseAllChildren();
            this.processImage();
        });
    }

    uploadImage() {
        if (!this.imageURI) {
            return;
        }

        let [uriMeta, byteString] = this.imageURI.split(",");

        let typeString = uriMeta.split(":")[1].split(";")[0];

        let byteArray = new Uint8Array(byteString.length);

        for (let i = 0; i < byteString.length; i += 1) {
            byteArray[i] = byteString.charCodeAt(i);
        }

        let imageBlob = new Blob([byteArray], {type: typeString});
        if (imageBlob.size > 1e6) {
            console.log("Image too large! Aborting upload");
            return;
        }


        let formData = new FormData();

        formData.append("image", imageBlob);

        Ajax.post("/storage/upload_image/", {
            dataType: "json",
            data: formData,
            processData: false,
            contentType: false,
        }).then(
            (data) => this.finalURL.appendChild(
                            <a href={data.imageURL}>Successfully uploaded. Click to view.</a>
                        )
        );
    }

    processImage() {
        while (this.preview.node.firstChild) {
            this.preview.node.removeChild(this.preview.node.firstChild);
        }

        this.imageURI = null;

        let file = this.imageInput.getFile();
        if (!file) {
            return;
        }

        if (!(file.type === "image/png" || file.type === "image/jpeg")) {
            alert("File " + file.name + " is not an valid image but a " + file.type);
            return false;
        }

        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = (event) => {
            // blob stuff
            let blob = new Blob([event.target.result]); // create blob...
            window.URL = window.URL || window.webkitURL;
            let blobURL = window.URL.createObjectURL(blob); // and get it's URL

            // helper Image object
            let image = new Image();
            image.src = blobURL;
            //preview.appendChild(image); // preview commented out, I am using the canvas instead
            image.onload = () => {
                // have to wait till it's loaded
                let resized = this.resizeImage(image); // send it to canvas
                let newinput = document.createElement("input");
                newinput.type = 'hidden';
                newinput.name = 'image';
                newinput.value = resized; // put result from canvas into new hidden input
                console.log("resized size", resized.toString().length * 6 / 8 / 1024, "kb");
                // console.log(resized);
                this.compressedImage.node.src = resized;

                this.imageURI = resized;
            }
        };
        this.imageInput.value = "";
    }

    resizeImage(image) {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext("2d");

        let width = image.width;
        let height = image.height;

        let maxSize = 400;
        let source = image;

        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > maxSize) {
                if (width > maxSize * 4) {
                    width /= 2;
                    height /= 2;

                    let auxCanvas = document.createElement("canvas");
                    let auxContext = auxCanvas.getContext("2d");

                    auxCanvas.width = width;
                    auxCanvas.height = height;

                    auxContext.drawImage(source, 0, 0, width, height);

                    source = auxCanvas;
                }


                height = Math.round(height * maxSize / width);
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                if (height > maxSize * 4) {
                    width /= 2;
                    height /= 2;

                    let auxCanvas = document.createElement("canvas");
                    let auxContext = auxCanvas.getContext("2d");

                    auxCanvas.width = width;
                    auxCanvas.height = height;

                    auxContext.drawImage(source, 0, 0, width, height);

                    source = auxCanvas;
                }

                width = Math.round(width * maxSize / height);
                height = maxSize;
            }
        }

        // resize the canvas and draw the image data into it
        canvas.width = width;
        canvas.height = height;
        context.drawImage(source, 0, 0, width, height);

        this.preview.node.appendChild(canvas); // do the actual resized preview
        let quality = this.imageQualityInput.getValue() || 0.7;

        return canvas.toDataURL("image/jpeg", quality); // get the data from canvas as 70% JPG (can be also PNG, etc.)
    }
}
