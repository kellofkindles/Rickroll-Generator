let errorActive = false;
let imgIsBroken = false;

async function generateRickroll(){
    const url = encodeURI(document.getElementById("title").value);
    const desc = document.getElementById("description").value;
    const title  = document.getElementById("title").value;
    const ImgUrlValue = document.getElementById("ImgUrl").value;
    const urlCont = document.getElementById("rr-link");
    const dataLinkElement = document.getElementById("stats-link");
    const type = document.getElementById("type").value;

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url, 
            title: title, 
            description: desc,
            type: type,
            ImgUrl: ImgUrlValue
        }),
    };
    response = await fetch('/gen/rr' , options)
        .then ((response) => {
            if (response.ok){
                return response.json()
            } else {
                //errorDIV.innerHTML = "" todo
                throw new Error(`Server responded with ${response.status} -_-`)
            }
        })
        .catch(error => console.log(error) );

    // urlCont.innerHTML = `${document.location.origin}/${type}/${response.url}`
    // urlCont.setAttribute('href', `${document.location.origin}/${type}/${response.url}`)

    const dataLink = `${document.location.origin}/data?url=${response.url}`
    // dataLinkElement.innerHTML = dataLink
    // dataLinkElement.setAttribute('href' , dataLink)
    document.location = dataLink;
}

function previewImg(url){
    if (url.indexOf("http://") != 0 && url.indexOf("https://") != 0) {
        console.log(url.indexOf("http://") != 0 || url.indexOf("https://") != 0)
        imagePreviewError("The url needs to start with https:// or http://");
        return;
    } 
    const img = document.getElementById("img-preview")
    fetch(url, {
		method: "GET",
	})
		.then((response) => {
			if (response.status == 200){
                document.getElementById("img-preview").setAttribute("src", url);
                if (errorActive){
                    imagePreviewError();
                }
            } else {
                img.setAttribute("src", "/img/invalid.png");
                imagePreviewError("The url is not valid");
            }
		})
        .catch((error) => {
            img.setAttribute("src", "/img/invalid.png");
            imagePreviewError("The url is not valid");
        });
}

function imagePreviewError(error){
    if (!error){
        document.getElementById("container-preview-error").style.display = "none";
        errorActive = false;
        return;
    }
    const errorDIV = document.getElementById("img-preview-error");
    error = "⚠️ " + error;
    errorDIV.innerHTML = error;
    document.getElementById("container-preview-error").style.display = "block";
    errorActive = true;
}

document.getElementById("ImgUrl").onkeyup = (e) => {
    if (e.target.value.length > 0){
        previewImg(e.target.value);
    } else {
        document.getElementById("img-preview").setAttribute("src", "/img/preview.png");
    }
};